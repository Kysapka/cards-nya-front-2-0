import React from 'react';
import {NavLink} from "react-router-dom";
import {publicRoutes} from "../routes/AppRoutes";

export const Header = () => {
    return (
        <div style={{marginBottom: '20px'}}>
            {publicRoutes.map(({path}) =>
                <NavLink to={path}>
                    <span style={{padding: '5px'}}>{path}</span>
                </NavLink>
            )}

        </div>
    );
};