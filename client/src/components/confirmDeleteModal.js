import Modal from 'react-modal';
import TodoForm from './TodoForm';
import React from 'react'

const ConfirmDeleteModal = (props) => {
    return (
        <Modal 
        closeTimeoutMS={200}
        isOpen={props.isOpen}
        appElement={document.getElementById('root')}
        onRequestClose={props.handleCloseModal}
        className={"todo-modal"}
        >
        <div>
        Samuel, are you sure you would like to delete this task?
        </div>
        </Modal>
    )
}

export default ConfirmDeleteModal;