import React, {useState} from 'react';
import {useFormik} from 'formik'
import * as Yup from 'yup'
import { Link} from 'react-router-dom'
const AuthForm = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [formMessage,setFormMessage] = useState(null);
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            name: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().optional('Null will be used if empty'),
            email: Yup.string().required('Email address is required').email('Invalid email address'),
            password: Yup.string().required('Password is required').min(6, 'Password must be at least six characters')
        }),
        onSubmit: values => { 
            setIsLoading(true);
            props.onSubmit(values)
                .then((message) => {
                    let backupMessage;
                    if(!message){
                        backupMessage = props.type === 'Sign up'? 'Sign up successful' : 'Login successful'
                    }
            setFormMessage(message || backupMessage);
            setIsLoading(false)
            if(backupMessage){
                props.history.push('/dashboard')
            }
            return;
            })
        }
    })
    return (
        <form className='form' onSubmit={formik.handleSubmit}>
        {formMessage ? (<p className='form__text-small' style={{color: 'blue'}}>{formMessage}</p>) :
        null}

        {
            props.type === 'Sign up' ? (
            <div className='form'>
            <label className='no' htmlFor='name'>Name</label>
            <input
            autoComplete='givenname'
            className='form__input'
            type='text'
            id='name'
            name='name'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            />
            <p className='tiny-info'>You will be referred to as 'Anonymous' if no name is provided</p>
            </div>
            ) : null
        }
        <label htmlFor='email'>Email address</label>
        <input
        autoComplete='email'
        className='form__input'
        type='email'
        id='email'
        name='email'
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
            <div className='error'>{formik.errors.email}</div>) : null}
        <label htmlFor='password'>Password</label>
        <input
        autoComplete='current-password'
        className='form__input'
        type='password'
        id='password'
        name='password'
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.password}/>
        {formik.touched.password && formik.errors.password ? (
            <div className='error'>{formik.errors.password}</div>) : null}
        <button disabled={!!isLoading} className='form__button' type='submit'>{ isLoading ? 'Loading...' : props.type}</button>
        { props.type === 'Sign up'? (<p className='form__text-small'>Already have an account?<Link to='/'> Login</Link></p>) : <p className='form__text-small'>Don't have an account?<Link to='/register'> Sign up</Link></p>}
        </form>
    )
}

export default AuthForm;