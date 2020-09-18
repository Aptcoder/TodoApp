import React  from 'react';
import {Switch, Route, BrowserRouter as Router} from 'react-router-dom';
// import {} from 'reac';
import LoginPage from '../components/LoginPage';
import NotFoundPage from '../components/NotFoundPage'
import SignupPage from '../components/SignupPage'
import Dashboard from '../components/Dashboard'

import PrivateRoute from './PrivateRouter';
import PublicRoute from './PublicRouter';
const AppRouter = (props) => {
    return (
        <Router>
            <Switch>
                <PublicRoute path='/' exact={true} component={LoginPage}/>
                <PublicRoute path='/register' component={SignupPage}/>
                <PrivateRoute path='/dashboard' component={Dashboard}/>
                <Route component={NotFoundPage}/>
            </Switch>
        </Router>
    );
}

export default AppRouter;