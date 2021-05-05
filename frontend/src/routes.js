import React from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
//test
export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path='/' exact compononet={Login} />
                <Route path = '/dashboard' componnet = {Dashboard}/>
            </Switch>
        </BrowserRouter>
    )
}