import React, { useMemo, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';
import './styles/storybook.css';
import {
  Badge,
  Banner,
  Button,
  Checkbox,
  Divider,
  FilterSortButton,
  InputField,
  Search,
  SegmentedButton,
  Slider,
  Table,
  Tabs,
  TextField,
  ToggleButton,
  ToggleSwitch,
  type CheckboxSelection,
  type SliderValue
} from './components';

const tabs = [
  { value: 'operations', label: 'Operations' },
  { value: 'fleet', label: 'Fleet' },
  { value: 'alerts', label: 'Alerts' },
  { value: 'access', label: 'Access' }
];

const modeItems = [
  { value: 'standard', label: 'Standard' },
  { value: 'strict', label: 'Strict' },
  { value: 'manual', label: 'Manual' }
];

const layerItems = [
  { value: 'drones', label: 'Drones' },
  { value: 'docks', label: 'Docks' },
  { value: 'routes', label: 'Routes' }
];

const droneOptions = ['Mavic 3 Enterprise', 'Dock 12 Surveyor', 'Matrice 350 RTK'];
const siteOptions = ['Bengaluru Hub', 'Mumbai Port', 'Delhi Yard'];

function SettingsExperiment() {
  const [activeTab, setActiveTab] = useState('operations');
  const [query, setQuery] = useState('');
  const [profileName, setProfileName] = useState('Return-to-dock safety profile');
  const [drone, setDrone] = useState('Mavic 3 Enterprise');
  const [sites, setSites] = useState<string[]>(['Bengaluru Hub', 'Mumbai Port']);
  const [autoReturn, setAutoReturn] = useState(true);
  const [weatherHold, setWeatherHold] = useState<CheckboxSelection>('selected');
  const [altitude, setAltitude] = useState<SliderValue>(60);
  const [temperatureRange, setTemperatureRange] = useState<SliderValue>([18, 42]);
  const [mode, setMode] = useState('strict');
  const [layers, setLayers] = useState(['drones', 'routes']);
  const [selectedRowIds, setSelectedRowIds] = useState(['Dock 12']);

  const tableRows = useMemo(
    () => [
      {
        name: 'Dock 12',
        status: <Badge tone="success">Ready</Badge>,
        failsafe: autoReturn ? 'Auto return' : 'Manual review',
        site: 'Bengaluru Hub',
        updated: '2 min ago'
      },
      {
        name: 'Matrice Yard',
        status: <Badge tone="warning">Needs review</Badge>,
        failsafe: 'Weather hold',
        site: 'Delhi Yard',
        updated: '18 min ago'
      },
      {
        name: 'Port Survey',
        status: <Badge tone="info">Scheduled</Badge>,
        failsafe: 'Route check',
        site: 'Mumbai Port',
        updated: '1 hr ago'
      }
    ],
    [autoReturn]
  );

  return (
    <main className="settings-shell">
      <aside className="settings-sidebar" aria-label="Settings sections">
        <div>
          <span className="settings-kicker">Flytbase</span>
          <h1>Operations settings</h1>
        </div>
        <nav className="settings-nav" aria-label="Settings navigation">
          {tabs.map((tab) => (
            <button data-active={activeTab === tab.value ? 'yes' : 'no'} key={tab.value} onClick={() => setActiveTab(tab.value)} type="button">
              {tab.label}
            </button>
          ))}
        </nav>
      </aside>

      <section className="settings-workspace">
        <header className="settings-header">
          <div>
            <span className="settings-kicker">Experiment</span>
            <h2>Drone operations configuration</h2>
          </div>
          <Search
            ariaLabel="Search settings"
            onChange={(event) => setQuery(event.currentTarget.value)}
            onClear={() => setQuery('')}
            placeholder="Search settings"
            value={query}
            visualState={query ? 'active' : 'default'}
          />
        </header>

        <Tabs items={tabs} onChange={setActiveTab} value={activeTab} />

        <Banner tone="info" title="Design system experiment">
          This page is assembled from the Storybook design-system components and documented interaction APIs.
        </Banner>

        <section className="settings-grid" aria-label="Settings panels">
          <section className="settings-panel">
            <div className="settings-panel-header">
              <h3>Failsafe policy</h3>
              <Badge tone="success">Synced</Badge>
            </div>
            <div className="settings-form-grid">
              <TextField
                helperText="Visible to operators when reviewing mission configuration."
                label="Profile name"
                onChange={(event) => setProfileName(event.currentTarget.value)}
                value={profileName}
              />
              <InputField
                active
                label="Primary drone"
                onChange={(value) => setDrone(String(value))}
                options={droneOptions}
                value={drone}
              />
              <InputField
                active
                label="Allowed sites"
                onChange={(value) => setSites(Array.isArray(value) ? value : [value])}
                options={siteOptions}
                selection="multiple"
                value={sites}
              />
            </div>

            <Divider />

            <div className="settings-control-list">
              <ToggleSwitch label="Auto return-to-dock" onSelectedChange={setAutoReturn} selected={autoReturn} />
              <Checkbox label="Hold missions during weather disagreement" onSelectionChange={setWeatherHold} selection={weatherHold} />
            </div>
          </section>

          <section className="settings-panel">
            <div className="settings-panel-header">
              <h3>Limits and modes</h3>
              <FilterSortButton active activeCount={2} kind="filter">Filters</FilterSortButton>
            </div>
            <SegmentedButton items={modeItems} onChange={setMode} value={mode} />
            <ToggleButton ariaLabel="Map layers" items={layerItems} onChange={setLayers} values={layers} />
            <div className="settings-slider-stack">
              <Slider label="Return altitude" onChange={setAltitude} unit="m" value={altitude} />
              <Slider label="Safe temperature range" mode="range" onChange={setTemperatureRange} unit="°C" value={temperatureRange} />
            </div>
          </section>
        </section>

        <section className="settings-table-section">
          <div className="settings-panel-header">
            <h3>Assigned assets</h3>
            <div className="settings-actions">
              <Button variant="secondary">Cancel</Button>
              <Button>Save changes</Button>
            </div>
          </div>
          <Table
            caption="Assigned assets"
            columns={[
              { key: 'name', header: 'Asset' },
              { key: 'status', header: 'Status' },
              { key: 'failsafe', header: 'Failsafe' },
              { key: 'site', header: 'Site' },
              { key: 'updated', header: 'Updated', align: 'right' }
            ]}
            getRowId={(row) => String(row.name)}
            onRowSelectionChange={setSelectedRowIds}
            rows={tableRows}
            selectedRowIds={selectedRowIds}
          />
        </section>
      </section>
    </main>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SettingsExperiment />
  </React.StrictMode>
);
