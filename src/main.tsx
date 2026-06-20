import React from 'react';
import ReactDOM from 'react-dom/client';
import '../tokens/index.css';
import './styles/storybook.css';
import { Button, Search, TextField, ToggleSwitch } from './components';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <main className="fds-demo-shell">
      <Search ariaLabel="Search components" value="Tier 1" />
      <TextField label="Project" value="F Design System 2.0" />
      <div className="fds-demo-row">
        <Button>Open Storybook</Button>
        <ToggleSwitch label="Token driven" selected />
      </div>
    </main>
  </React.StrictMode>
);
