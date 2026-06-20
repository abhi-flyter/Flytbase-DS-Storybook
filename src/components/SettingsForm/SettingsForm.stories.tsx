import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button, ButtonGroup, Checkbox, InputField, TextField, ToggleSwitch } from '../index';

const meta: Meta = {
  title: 'Components/SettingsForm',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A small settings form composition built only from documented FB Design System components: TextField, InputField, ToggleSwitch, Checkbox, ButtonGroup, and Button.'
      }
    }
  }
};

export default meta;
type Story = StoryObj;

const surfaceStyle = {
  minHeight: '100vh',
  background: '#f6f8fb',
  padding: '48px',
  color: '#111827',
  fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
};

const panelStyle = {
  width: '520px',
  maxWidth: '100%',
  background: '#ffffff',
  border: '1px solid #e5e7eb',
  borderRadius: '16px',
  padding: '28px',
  boxShadow: '0 16px 40px rgba(15, 23, 42, 0.08)'
};

const sectionStyle = {
  display: 'grid',
  gap: '18px',
  marginTop: '24px'
};

const rowStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '24px',
  padding: '16px 0',
  borderTop: '1px solid #eef2f7'
};

const copyStyle = {
  display: 'grid',
  gap: '4px'
};

const helperTextStyle = {
  margin: 0,
  color: '#6b7280',
  fontSize: '14px',
  lineHeight: 1.5
};

export const AccountSettings: Story = {
  render: () => (
    <main style={surfaceStyle}>
      <section style={panelStyle} aria-labelledby="settings-form-title">
        <div>
          <p style={{ margin: '0 0 8px', color: '#4f46e5', fontSize: '13px', fontWeight: 700 }}>
            Workspace settings
          </p>
          <h1 id="settings-form-title" style={{ margin: 0, fontSize: '28px', lineHeight: 1.2 }}>
            Configure your operations profile
          </h1>
          <p style={{ ...helperTextStyle, marginTop: '10px' }}>
            Update the core account details, default drone, and notification preferences for this workspace.
          </p>
        </div>

        <div style={sectionStyle}>
          <TextField
            helperText="This name appears in internal workspace menus."
            label="Workspace name"
            placeholder="Enter workspace name"
            requirement="mandatory"
            value="FlytBase Operations"
            visualState="active"
          />

          <TextField
            helperText="Used for design system and product update emails."
            label="Notification email"
            placeholder="name@company.com"
            requirement="mandatory"
            value="ops@flytbase.com"
            visualState="default"
          />

          <InputField
            active
            label="Default drone"
            mode="dropdown"
            options={['Dock 01 · Drone A', 'Dock 02 · Drone B', 'Dock 03 · Drone C']}
            placeholder="Select drone"
            selection="single"
            visualState="default"
          />

          <TextField
            helperText="Optional notes for operators who use this workspace."
            label="Workspace notes"
            multiline
            placeholder="Add operational notes"
            requirement="optional"
            value="Use this profile for routine autonomous inspection missions."
            visualState="description"
          />
        </div>

        <div style={{ marginTop: '28px' }}>
          <div style={rowStyle}>
            <div style={copyStyle}>
              <strong>Mission alerts</strong>
              <p style={helperTextStyle}>Send alerts when a mission needs operator attention.</p>
            </div>
            <ToggleSwitch label="Enable mission alerts" selected visualState="default" />
          </div>

          <div style={rowStyle}>
            <div style={copyStyle}>
              <strong>Weekly usage summary</strong>
              <p style={helperTextStyle}>Email a compact summary of workspace activity every Monday.</p>
            </div>
            <Checkbox boxSize="20px" label="Receive summary" selection="selected" visualState="default" />
          </div>
        </div>

        <div style={{ marginTop: '28px' }}>
          <ButtonGroup padding="default">
            <Button variant="secondary" size="default" visualState="idle">
              Cancel
            </Button>
            <Button variant="primary" size="default" visualState="idle">
              Save settings
            </Button>
          </ButtonGroup>
        </div>
      </section>
    </main>
  )
};
