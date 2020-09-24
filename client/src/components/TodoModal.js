import Modal from 'react-modal';
import TodoForm from './TodoForm';
import React from 'react'

const TodoModal = (props) => {
    return (
        <Modal 
        closeTimeoutMS={200}
        isOpen={props.isOpen}
        appElement={document.getElementById('root')}
        onRequestClose={props.handleCloseTodoModal}
        className={"todo-modal"}
        >
        <TodoForm onSubmit={props.onSubmit} todo={props.todo} closeModal={props.handleCloseTodoModal}/>
        </Modal>
    )
}

export default TodoModal;