import React from 'react';
import {connect} from 'react-redux'
import TodoListItem from './TodoListItem';
import ConfirmDeleteModal from './confirmDeleteModal'
import {startDeleteTodo} from '../actions/todos'
export class TodoList extends React.Component {

    state = {
        deleteOpen: false,
        deleteModalTodo: null
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
        startDeleteTodo: async (todoId) => dispatch(startDeleteTodo(todoId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)