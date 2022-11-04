import React from 'react';
import {createRoot} from 'react-dom/client';
import Rutas from './router';
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Rutas />
  </React.StrictMode>,
);

