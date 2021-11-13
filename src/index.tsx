import React from 'react';

// eslint-disable-next-line import/order
import ReactDOM from 'react-dom';

import './index.css';

import { HashRouter } from 'react-router-dom';

import { App } from './n1-main/m1-ui/App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>,
  document.getElementById('root'),
);

reportWebVitals();
