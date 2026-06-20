import type { Meta, StoryObj } from '@storybook/react';
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

export const Playground: Story = {};

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
