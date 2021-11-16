import React, { ReactElement } from 'react';
import '../App.css';

export const Loader = (): ReactElement => (
  <div className="row justify-content-center align-items-center h-100">
    <div className="lds-hourglass " />
  </div>
);
