import React from 'react';
import AuthForm from './AuthForm';
const LoginPage = (props) => {
    return (
        <div className='card'>
        <h2 className='card__title'>Welcome back</h2>
        <AuthForm type={'login'}/>
        </div>
        
    )
}

export default LoginPage;