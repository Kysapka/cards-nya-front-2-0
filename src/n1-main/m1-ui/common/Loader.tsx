import React, { ReactElement } from 'react';
import '../App.css';

export const Loader = (): ReactElement => (
  <div
    style={{ height: '100vh' }}
    className="row justify-content-center align-items-center"
  >
    <div className="lds-hourglass " />
  </div>
);
