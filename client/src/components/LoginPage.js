import React, {useEffect} from 'react';
import {connect} from 'react-redux'
import AuthForm from './AuthForm';
import {startLogin} from '../actions/auth'
const LoginPage = (props) => {

    useEffect(() => {
        return () => {
            console.log('Login unmounted now!')
        }
    })
    return (
        <div className='card'>
        <h2 className='card__title'>Welcome back</h2>
        <AuthForm type={'login'} onSubmit={props.startLogin}/>
        </div>
        
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        startLogin: async (values) => await dispatch(startLogin(values))
}
}

export default connect(null,mapDispatchToProps)(LoginPage);