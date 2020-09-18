import React from 'react';
import {connect} from 'react-redux'
import AuthForm from './AuthForm';
import {startRegister} from '../actions/auth'

const SignupPage = (props) => {
    return (
        <div className='card'>
        <h2 className='card__title'>Sign up</h2>
        <AuthForm type={'Sign up'} onSubmit={props.startRegister}/>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        startRegister: async (values) => {
            try {
                await dispatch(startRegister(values));
            }
            catch(msg){
                return msg;
            }
        }
    }
}

export default connect(null,mapDispatchToProps)(SignupPage);