import React, { ReactElement } from 'react';
import '../App.css';

export const Loader = (): ReactElement => (
  <div className="row justify-content-center align-items-center">
    <img
      style={{ height: '300px', width: '400px' }}
      src="https://thumbs.gfycat.com/BouncyWelcomeGrassspider-max-1mb.gif"
      alt="Nyan Loader"
    />
  </div>
);
