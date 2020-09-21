import React from 'react'
import {Formik} from 'formik'
import * as Yup from 'yup'
import Datetime from "react-datetime";
import moment from 'moment'
const TodoForm = (props) => {
    return (
        <Formik
        initialValues={{
            title: '',
            description: '',
            'date-time': ''
        }}
        validationSchema={
            Yup.object({
                title: Yup.string().required('Title is required'),
                'date-time': Yup.object().required('Date and time is required')
            })
        }
        onSubmit={(values) => {
                console.log(values)
                console.log(moment(values['date-time']).format());
                // props.closeModal()
            }}
        onChange={function (){
            console.log(arguments);
        }}
        >
        {
            formik => (
                <form className="form" onSubmit={formik.handleSubmit}>
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
                <button type="submit" className="form__button">Add todo</button>
                </form>
                
            )
        }
        </Formik>
    )
}

export default TodoForm;