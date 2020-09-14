import React from 'react';
import {useFormik} from 'formik'
import * as Yup from 'yup'
const AuthForm = (props) => {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().required('Email address is required').email('Invalid email address'),
            password: Yup.string().min(6, 'Password must be at least six characters')
        }),
        onSubmit: values => console.log(JSON.stringify(values))
    })
    return (
        <form className='form' onSubmit={formik.handleSubmit}>
        <label htmlFor='email'>Email address</label>
        <input
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
        className='form__input'
        type='password'
        id='password'
        name='password'
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.password}/>
        {formik.touched.password && formik.errors.password ? (
            <div className='error'>{formik.errors.password}</div>) : null}
        <button className='form__button' type='submit'>{props.type}</button>
        </form>
    )
}

export default AuthForm;