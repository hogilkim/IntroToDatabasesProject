import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Login from './pages/Login';
import MyTickets from './pages/MyTickets';
import Register from './pages/Register'

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Login} />
                <Route path = '/mytickets' exact component = {MyTickets} />
                <Route path = '/user/customer/register' exact component = {Register} />
            </Switch>
        </BrowserRouter>
    );
}