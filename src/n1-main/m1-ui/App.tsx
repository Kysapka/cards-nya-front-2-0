import React from 'react';
import './App.css';
import {Main} from "./Main";
import {HashRouter} from "react-router-dom";

export const App = () => {
    return (
        <HashRouter>
            <div className="App">
                <Main/>
            </div>
        </HashRouter>
    )
};
