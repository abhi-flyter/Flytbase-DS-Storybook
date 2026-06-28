import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import type { TablePaginationState, TableSortState } from './Table';
import { Table } from './Table';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { Checkbox } from '../Checkbox';
import { FilterSortButton } from '../FilterSortButton';
import { Search } from '../Search';
import { VariantGroup, VariantSection } from '../story-helpers';
import { componentDocs } from '../docs';

const columns = [
  { key: 'selected', header: <Checkbox aria-label="Select all rows" label="" /> },
  { key: 'name', header: 'Name' },
  { key: 'date', header: 'Date' },
  { key: 'time', header: 'Time (GMT+05:30)' },
  { key: 'drone', header: 'Drone' },
  { key: 'files', header: <FilterSortButton active activeCount={2} kind="sort">Files</FilterSortButton> },
  { key: 'actions', header: 'Actions', align: 'right' }
] as const;

const rows = [
  {
    selected: <Checkbox aria-label="Select row" label="" />,
    name: 'Mission Name 1',
    date: '12 May 2023',
    time: '10:30 am',
    drone: 'Mavic 2 enp',
    files: 'Uploading 2/1',
    actions: <Badge tone="info">Label</Badge>
  },
  {
    selected: <Checkbox aria-label="Select row" label="" />,
    name: 'Mission Name 1',
    date: '12 May 2023',
    time: '10:30 pm',
    drone: 'Mavic 2 enp',
    files: 'Uploading 2/1',
    actions: <Badge tone="success">Label</Badge>
  },
  {
    selected: <Checkbox aria-label="Select row" label="" />,
    name: 'Mission Name 1',
    date: '12 May 2023',
    time: '10:30 GMT',
    drone: 'Mavic 2 enp',
    files: 'Uploading 2/1',
    actions: <Badge tone="warning">Label</Badge>
  }
];

const selectableColumns = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'date', header: 'Date', sortable: true },
  { key: 'drone', header: 'Drone' },
  { key: 'files', header: 'Files', sortable: true }
] as const;

const selectableRows = [
  { name: 'Mission Alpha', date: '12 May 2023', drone: 'Mavic 2', files: '4 files' },
  { name: 'Mission Bravo', date: '13 May 2023', drone: 'Dock 12', files: '2 files' },
  { name: 'Mission Charlie', date: '14 May 2023', drone: 'Mavic 3', files: 'Uploading 2/1' },
  { name: 'Mission Delta', date: '15 May 2023', drone: 'Dock 03', files: '1 file' }
];

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: componentDocs.Table } },
    layout: 'fullscreen'
  },
  args: {
    caption: 'Mission table',
    columns,
    rows,
    toolbar: (
      <>
        <Search ariaLabel="Search table" placeholder="Search" />
        <FilterSortButton kind="sort" />
        <FilterSortButton active activeCount={2} kind="filter" />
        <Button variant="secondary">Secondary Button</Button>
        <Button>Primary Button</Button>
      </>
    ),
    footer: <>Devices: 6/20 <span>1-5 of 100</span><span>Lines per page 5</span></>
  }
};

export default meta;
type Story = StoryObj<typeof Table>;

async function expectText(root: Element, text: string) {
  for (let attempt = 0; attempt < 10; attempt += 1) {
    if (root.textContent?.includes(text)) return;
    await new Promise((resolve) => setTimeout(resolve, 20));
  }
  throw new Error(`Expected rendered text: ${text}`);
}

function getButton(root: Element, label: string) {
  const button = Array.from(root.querySelectorAll<HTMLButtonElement>('button')).find((candidate) => candidate.textContent?.includes(label));
  if (!button) throw new Error(`Expected button ${label}`);
  return button;
}

function getControl(root: Element, label: string) {
  const control = root.querySelector<HTMLElement>(`[aria-label="${label}"]`);
  if (!control) throw new Error(`Expected control ${label}`);
  return control;
}

export const Playground: Story = {};

export const Usage: Story = {
  render: () => {
    const [selectedRowIds, setSelectedRowIds] = useState(['Mission Alpha']);
    const [sort, setSort] = useState<TableSortState<(typeof selectableRows)[number]> | null>(null);
    const [pagination, setPagination] = useState<TablePaginationState>({ page: 1, pageSize: 2 });
    return (
      <VariantSection title="Table Usage">
        <VariantGroup label="Controlled selection, sorting, and pagination">
          <span>Selection: {selectedRowIds.join(', ') || 'none'}</span>
          <span>Sort: {sort ? `${sort.key} ${sort.direction}` : 'none'}</span>
          <span>Page: {pagination.page}</span>
          <Table
            caption="Selectable mission table"
            columns={selectableColumns}
            getRowId={(row) => String(row.name)}
            onPaginationChange={setPagination}
            onRowSelectionChange={setSelectedRowIds}
            onSortChange={setSort}
            pagination={pagination}
            rows={selectableRows}
            selectedRowIds={selectedRowIds}
            sort={sort}
          />
        </VariantGroup>
      </VariantSection>
    );
  },
  play: async ({ canvasElement }) => {
    await expectText(canvasElement, 'Selection: Mission Alpha');
    getControl(canvasElement, 'Select row 2').click();
    await expectText(canvasElement, 'Selection: Mission Alpha, Mission Bravo');

    const nameSortButton = getButton(canvasElement, 'Name');
    nameSortButton.click();
    await expectText(canvasElement, 'Sort: name ascending');
    nameSortButton.click();
    await expectText(canvasElement, 'Sort: name descending');

    getButton(canvasElement, 'Next').click();
    await expectText(canvasElement, 'Page: 2');
    await expectText(canvasElement, 'Mission Bravo');
  }
};

export const OperationalTable: Story = {
  render: () => (
    <VariantSection title="Table">
      <VariantGroup label="Operational data">
        <Table
          caption="Mission table"
          columns={columns}
          footer={<>Devices: 6/20 <span>1-5 of 100</span><span>Lines per page 5</span></>}
          rows={rows}
          toolbar={
            <>
              <Search ariaLabel="Search table" placeholder="Search" />
              <FilterSortButton kind="sort" />
              <FilterSortButton active activeCount={2} kind="filter" />
              <Button variant="secondary">Secondary Button</Button>
              <Button>Primary Button</Button>
            </>
          }
        />
      </VariantGroup>
    </VariantSection>
  )
};
