import React from 'react';
import {connect} from 'react-redux'
import TodoListItem from './TodoListItem';
import ConfirmDeleteModal from './ConfirmDeleteModal'
import ConfirmCompleteModal from './ConfirmCompleteModal';
import {startDeleteTodo, startCompleteTodo} from '../actions/todos';

export class TodoList extends React.Component {

    state = {
        deleteOpen: false,
        deleteModalTodo: null,
        completeOpen: false,
        completeModalTodo: null
    }
    handleEdit = (todoId) => {
        const todo = this.props.todos.find((todo)=> {
            if(todo.id === todoId){
                return true
            }
            return false
        });
        this.props.handleEdit(todo);
    }

    handleOpenDeleteModal = (todo) => {
        this.setState(() => ({deleteModalTodo: todo}));
        this.setState(() => ({deleteOpen: true}))
    }

    handleOpenCompleteModal = (todo) => {
        this.setState(() => ({completeModalTodo: todo}))
        this.setState(() => ({completeOpen: true}))
    }
    handleCloseCompleteModal = () => {
        this.setState(() => {
            return {
                completeOpen: false
            }
        })
    }
    handleCloseDeleteModal = () => {
        this.setState(() => {
            return {
                deleteOpen: false
            }
        })
    }
    render(){
        return (
            <div>
            {
               this.props.todos.map((todo) => {
                   return <TodoListItem 
                   editItem={this.handleEdit} 
                   deleteItem={this.handleOpenDeleteModal}
                   completeItem={this.handleOpenCompleteModal}
                   key={todo.id} todo={todo}
                   />
               })
            }
            <ConfirmDeleteModal 
            onDelete={this.props.startDeleteTodo}
            todo={this.state.deleteModalTodo}
            user={this.props.user}
            isOpen={this.state.deleteOpen}
            handleCloseModal={this.handleCloseDeleteModal}
            />
            
            <ConfirmCompleteModal
            onComplete={this.props.startCompleteTodo}
            isOpen={this.state.completeOpen}
            handleCloseModal={this.handleCloseCompleteModal}
            todo={this.state.completeModalTodo}
            />
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        todos: state.todos,
        user: state.auth.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        startCompleteTodo: async (todoId) => dispatch(startCompleteTodo(todoId)),
        startDeleteTodo: async (todoId) => dispatch(startDeleteTodo(todoId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)