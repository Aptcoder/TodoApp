import Modal from 'react-modal';
import React from 'react'

const ConfirmCompleteModal = (props) => {
    
    const onYesClick = () => {
        props.onComplete(props.todo.id)
        .then((response) => {
            console.log(response)
            props.handleCloseModal()
        })
        .catch((error) => {
            console.log(error)
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
        <p>Hey there, are you sure you'll like to mark task with title <strong>{props.todo ? props.todo.title : ''}</strong> as completed </p>
        <button className="option-button" onClick={onYesClick}>Yes</button> <button onClick={props.handleCloseModal} className="option-button" >No</button>
        </div>
        </Modal>
    )
}

export default ConfirmCompleteModal;