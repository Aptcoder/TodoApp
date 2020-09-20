import React from 'react';
import {faPlus} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

export default (props) => {
    return (
        <button className="fab__button">
        <FontAwesomeIcon size="1x" icon={faPlus}/>
        </button>)
}