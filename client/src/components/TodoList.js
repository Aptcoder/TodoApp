import React from 'react';
import {connect} from 'react-redux'
import TodoListItem from './TodoListItem';
export const TodoList = (props) => {
 return (
     <div>
     {
        props.todos.map((todo) => {
            return <TodoListItem key={todo.id} todo={todo}/>
        })
     }
     </div>
 )
}
const mapStateToProps = (state) => {
    return {
        todos: state.todos
    }
}

export default connect(mapStateToProps)(TodoList)