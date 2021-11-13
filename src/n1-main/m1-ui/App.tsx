import React from 'react';

import './App.css';
import { HashRouter } from 'react-router-dom';

import { Main } from './Main';

export const App = (): React.ReactElement => (
  <HashRouter>
    <div className="App">
      <Main />
    </div>
  </HashRouter>
);
