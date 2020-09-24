import React from 'react';
import TodoList from './TodoList'
import {faPlus} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {connect} from "react-redux";
import TodoModal from './TodoModal';
import {startAddTodo,startTodoEdit} from '../actions/todos'

export class Dashboard extends React.Component {
    state = {
        isTodoModalOpen: false,
        currentTodo: null
    }
    handleFabClick = this.handleFabClick.bind(this);
    handleCloseTodoModal = this.handleCloseTodoModal.bind(this)

    handleCloseTodoModal(){
        this.setState(() => {
            return {
                isTodoModalOpen: false
            }
        })
    }

    handleFabClick(){
        this.setState(() => {
            return {
                currentTodo: null
            }
        })
        this.setState(() => {
            return {
                isTodoModalOpen: true
            }
        })
    }

    handleEdit = (todo) => {
        console.log('dash editing', todo)
        this.setState(() => {
            return {
                currentTodo: todo
            }
        });
        this.setState(() => {
            return {
                isTodoModalOpen: true
            }
        });
    }

    

    render(){
        return (

            <div className="dashboard">
            <TodoModal 
            todo={this.state.currentTodo}

            onSubmit={ this.state.currentTodo? this.props.editSubmit : this.props.addSubmit }
            handleCloseTodoModal={this.handleCloseTodoModal} 
            isOpen={this.state.isTodoModalOpen}/>
            <TodoList
            handleEdit={this.handleEdit}
            />
            <button onClick={this.handleFabClick} className="fab__button">
                   <FontAwesomeIcon size="1x" icon={faPlus}/>
            </button>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        editSubmit: async (todo, todoId) => await dispatch(startTodoEdit(todo,todoId)), 
        addSubmit: async (todo) => await dispatch(startAddTodo(todo))
    }
}

export default connect(null,mapDispatchToProps)(Dashboard)

