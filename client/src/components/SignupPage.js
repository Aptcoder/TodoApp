import React, {useEffect} from 'react';
import {connect} from 'react-redux'
import AuthForm from './AuthForm';
import {startRegister} from '../actions/auth'

const SignupPage = (props) => {

    useEffect(() => {
        return () => {
            console.log('Sign up unmounted now!')
        }
    })
    return (
        <div className='card'>
        <h2 className='card__title'>Sign up</h2>
        <AuthForm type={'Sign up'} onSubmit={props.startRegister}/>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        startRegister: async (values) => await dispatch(startRegister(values))
    }
}

export default connect(null,mapDispatchToProps)(SignupPage);