import React from 'react';
import ReactDOM from "react-dom/client";
import './css/bootstrap.css';
import './css/index.css';
import './css/basic.css';
import { Provider } from "react-redux"
import store from './Config/Store.js'
import App from './App';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
      <Provider store={store} > 
        <App />
      </Provider>
  </React.StrictMode>
);
