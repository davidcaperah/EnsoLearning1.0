import React from 'react';
import {BrowserRouter, Route, Switch } from 'react-router-dom';
import Dashboard from './Dashboard';

const Rutas = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path = "/Acudiente" component  = {Dashboard}/>
            </Switch>
        </BrowserRouter>
    );
}
 
export default Rutas;