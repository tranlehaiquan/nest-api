import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import { Select } from 'react-components';
import App from './app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <StrictMode>
    <Select />
    <App />
  </StrictMode>,
);
