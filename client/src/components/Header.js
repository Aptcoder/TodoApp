import React from 'react';
// import { Redirect } from "react-router-dom";
// import {history} from '../routers/AppRouter';

export default class Header extends React.Component {

    handleSignOut(){
        localStorage.removeItem('token');
        window.location = '/'
    }

    render(){
        return (
            <div>
            <div className='nav-bar'>
            <h2 className='logo-text'>TodoApp</h2>
            <ul className='nav'>
            <li className='nav__item'>
            <button className='nav__item-button' onClick={this.handleSignOut}>Sign out</button>
            </li>
            </ul>
            </div>
            </div>
        )
    }
}