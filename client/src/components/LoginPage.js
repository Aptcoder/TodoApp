import React from 'react';
import {connect} from 'react-redux'
import AuthForm from './AuthForm';
import {startLogin} from '../actions/auth'
const LoginPage = (props) => {
    return (
        <div className='card'>
        <h2 className='card__title'>Welcome back</h2>
        <AuthForm type={'login'} history={props.history} onSubmit={props.startLogin}/>
        </div>
        
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        startLogin: async (values) => {
            try {
                await dispatch(startLogin(values));
            }
            catch(msg){
                return msg;
            }
        }
    }
}

export default connect(null,mapDispatchToProps)(LoginPage);