import React from 'react';
import {connect} from 'react-redux'
import TodoListItem from './TodoListItem';
export class TodoList extends React.Component {

    handleEdit = (todoId) => {
        const todo = this.props.todos.find((todo)=> {
            if(todo.id === todoId){
                return true
            }
            return false
        });
        this.props.handleEdit(todo);
    }

    render(){
        return (
            <div>
            {
               this.props.todos.map((todo) => {
                   return <TodoListItem editItem={this.handleEdit} key={todo.id} todo={todo}/>
               })
            }
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        todos: state.todos
    }
}

export default connect(mapStateToProps)(TodoList)