import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { DatePicker, type DatePickerRange, type DatePickerValue } from './DatePicker';
import { VariantGroup, VariantSection } from '../story-helpers';
import { componentDocs } from '../docs';

const june2026 = new Date(2026, 5, 1);

const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: componentDocs.DatePicker } },
    layout: 'fullscreen'
  },
  argTypes: {
    mode: { control: 'select', options: ['single', 'range'] },
    showTime: { control: 'boolean' }
  },
  args: {
    mode: 'single',
    defaultVisibleMonth: june2026,
    defaultValue: new Date(2026, 5, 18),
    showTime: false
  }
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

function getDateButton(root: Element, label: string) {
  const button = root.querySelector<HTMLButtonElement>(`button[aria-label="${label}"]`);
  if (!button) {
    throw new Error(`Expected date button ${label}`);
  }
  return button;
}

function getGrid(root: Element, label: string) {
  const grid = root.querySelector<HTMLElement>(`[role="grid"][aria-label="${label}"]`);
  if (!grid) {
    throw new Error(`Expected grid ${label}`);
  }
  return grid;
}

async function expectText(root: Element, text: string) {
  for (let attempt = 0; attempt < 10; attempt += 1) {
    if (root.textContent?.includes(text)) {
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, 20));
  }
  throw new Error(`Expected rendered text: ${text}`);
}

export const Playground: Story = {};

export const Usage: Story = {
  render: () => {
    const [singleValue, setSingleValue] = useState<DatePickerValue>(new Date(2026, 5, 10));
    const [rangeValue, setRangeValue] = useState<DatePickerRange>({
      from: new Date(2026, 5, 12),
      to: new Date(2026, 5, 18)
    });
    const [visibleMonth, setVisibleMonth] = useState(june2026);
    const disabledDate = new Date(2026, 5, 20);

    return (
      <VariantSection title="Date picker Usage">
        <VariantGroup label="Controlled values">
          <DatePicker
            ariaLabel="Mission start date"
            maxDate={new Date(2026, 5, 30)}
            minDate={new Date(2026, 5, 1)}
            onChange={setSingleValue}
            onVisibleMonthChange={setVisibleMonth}
            value={singleValue}
            visibleMonth={visibleMonth}
          />
          <DatePicker
            ariaLabel="Mission window"
            disabledDates={[disabledDate]}
            mode="range"
            onChange={(nextValue) => setRangeValue(nextValue as DatePickerRange)}
            onTimeChange={() => undefined}
            showTime
            value={rangeValue}
          />
        </VariantGroup>
      </VariantSection>
    );
  },
  play: async ({ canvasElement }) => {
    const singleGrid = getGrid(canvasElement, 'Mission start date');
    getDateButton(singleGrid, 'Jun 14, 2026').click();
    await expectText(canvasElement, 'Selected Jun 14, 2026');

    const previousMonthButton = canvasElement.querySelector<HTMLButtonElement>('button[aria-label="Previous month"]');
    if (!previousMonthButton) throw new Error('Expected previous month button');
    previousMonthButton.click();
    await expectText(canvasElement, 'May 2026');

    const rangeGrid = getGrid(canvasElement, 'Mission window');
    getDateButton(rangeGrid, 'Jun 20, 2026').click();
    if (getDateButton(rangeGrid, 'Jun 20, 2026').getAttribute('aria-selected') === 'true') {
      throw new Error('Disabled date should not become selected');
    }

    getDateButton(rangeGrid, 'Jun 22, 2026').click();
    await expectText(canvasElement, 'Start Jun 22, 2026 / End None');
    getDateButton(getGrid(canvasElement, 'Mission window'), 'Jun 25, 2026').click();
    await expectText(canvasElement, 'Start Jun 22, 2026 / End Jun 25, 2026');

    const timeInput = canvasElement.querySelector<HTMLInputElement>('input[type="time"]');
    if (!timeInput) throw new Error('Expected time input');
    timeInput.value = '10:45';
    timeInput.dispatchEvent(new Event('input', { bubbles: true }));

    const clearAllButton = Array.from(canvasElement.querySelectorAll('button')).find((button) => button.textContent === 'Clear all');
    if (!clearAllButton) throw new Error('Expected clear all button');
    clearAllButton.click();
    await expectText(canvasElement, 'Start None / End None');
  }
};

export const AllVariants: Story = {
  render: () => (
    <VariantSection title="Date picker">
      <VariantGroup label="Modes">
        <DatePicker defaultVisibleMonth={june2026} mode="single" selected={18} />
        <DatePicker defaultVisibleMonth={june2026} mode="range" selected={[12, 18]} />
        <DatePicker defaultVisibleMonth={june2026} mode="range" selected={[12, 18]} showTime />
      </VariantGroup>
    </VariantSection>
  )
};
