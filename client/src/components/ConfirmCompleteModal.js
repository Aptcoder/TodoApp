import Modal from 'react-modal';
import React from 'react'

const ConfirmCompleteModal = (props) => {
    
    const onYesClick = () => {
        const currentVal = props.todo.isCompleted;
        props.onComplete(props.todo.id, currentVal)
        .then((response) => {
    
            props.handleCloseModal()
        })
        .catch((error) => {
            // TODO - DO something here
        })
    }
    return (
        <Modal 
        closeTimeoutMS={200}
        isOpen={props.isOpen}
        appElement={document.getElementById('root')}
        onRequestClose={props.handleCloseModal}
        className={"todo-modal"}
        >
        <div>
        <p>Hey there, are you sure you'll like to {props.todo? props.todo.isCompleted? 'unmark': 'mark' : null} task with title <strong>{props.todo ? props.todo.title : ''}</strong> as completed </p>
        <button className="option-button" onClick={onYesClick}>Yes</button> <button onClick={props.handleCloseModal} className="option-button" >No</button>
        </div>
        </Modal>
    )
}

export default ConfirmCompleteModal;