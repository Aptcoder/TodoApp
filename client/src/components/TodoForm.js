import React, { useState } from 'react'
import {Formik} from 'formik'
import * as Yup from 'yup'
import Datetime from "react-datetime";
import moment from 'moment'
const TodoForm = (props) => {

    const [isLoading,setIsLoading] = useState(null)
    const [formMessage, setFormMessage] = useState(null)
    return (
        <Formik
        initialValues={{
            title: props.todo ? props.todo.title : '',
            description: props.todo?  props.todo.description : '',
            'date-time': props.todo? new Date(props.todo.todoAt) : ''
        }}
        validationSchema={
            Yup.object({
                title: Yup.string().required('Title is required'),
                'date-time': Yup.string().required('Date and time is required')
            })
        }
        onSubmit={(values) => {
                setIsLoading(true)
                console.log(values)
                console.log(moment(values['date-time']).format());
                const id = props && props.todo? props.todo.id : null;
                props.onSubmit(values, id)
                .then((response) => {
                    setFormMessage(response);
                    setIsLoading(false)
                    props.closeModal();
                })
                .catch((message) => {
                    setFormMessage(message)
                    setIsLoading(false)
                })
                // props.closeModal()
            }}
        >
        {
            formik => (
                <form className="form" onSubmit={formik.handleSubmit}>
                {formMessage ? (<p className='form__text-small' style={{color: 'blue'}}>{formMessage}</p>) :
        null}
                <label htmlFor="title">
                Title
                </label>
                <input 
                className="form__input"
                type="text" 
                id='title'
                name='title'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.title}
                />
                {formik.touched.title && formik.errors.title ? (
                    <div className='error'>{formik.errors.title}</div>) : null}
                <label className="no" htmlFor="description">
                Description
                </label>
                <textarea
                className="form__input form__input-textarea"
                type="text" 
                id='description'
                name='description'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
                >
                </textarea>
                <label 
                htmlFor="date-time" 
                >
                Date-time
                </label>
                <Datetime
                input={true}
                inputProps={{
                    className: 'form__input',
                    type: "text" ,
                    id:'date-time',
                    name:'date-time'
                } }
                value={formik.values["date-time"]}
                onChange={(date) => {
                    formik.setFieldValue('date-time',date);
                }}
                // initialValue={}
                />
                {formik.touched['date-time'] && formik.errors['date-time'] ? (
                    <div className='error'>{formik.errors['date-time']}</div>) : null}
                <button type="submit" className="form__button">{isLoading? 'Loading...' : props.todo? 'Edit todo' : 'Add todo'}</button>
                </form>
                
            )
        }
        </Formik>
    )
}

export default TodoForm;