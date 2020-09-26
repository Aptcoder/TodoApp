import Modal from 'react-modal';
import React from 'react'

const ConfirmDeleteModal = (props) => {
    
    const onYesClick = () => {
        props.onDelete(props.todo.id)
        .then((response) => {
            props.handleCloseModal()
        })
        .catch((error) => {
            // TODO - Put something 
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
        <p>Hey there, are you sure you'll like to delete task with title: <strong>{props.todo ? props.todo.title : ''}</strong> </p>
        <button className="option-button" onClick={onYesClick}>Yes</button> <button onClick={props.handleCloseModal} className="option-button" >No</button>
        </div>
        </Modal>
    )
}

export default ConfirmDeleteModal;