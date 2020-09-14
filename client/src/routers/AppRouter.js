import React from 'react';
import {Switch, Route, BrowserRouter as Router} from 'react-router-dom';
// import {} from 'reac';
import LoginPage from '../components/LoginPage';
import NotFoundPage from '../components/NotFoundPage'
import SignupPage from '../components/SignupPage'
const AppRouter = (props) => {
    return (
        <Router>
            <Switch>
                <Route path='/' exact={true} component={LoginPage}/>
                <Route path='/register' component={SignupPage}/>
                <Route component={NotFoundPage}/>
            </Switch>
        </Router>
    );
}

export default AppRouter