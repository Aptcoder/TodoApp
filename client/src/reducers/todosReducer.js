
const todosReducer = (state=[],action) => {
    switch(action.type){
        case 'SET_TODOS': 
            return state.concat(action.todos)
        case 'ADD_TODO': 
            return state.concat(action.todo);
        case 'REMOVE_TODO': 
            return state.filter((todo) => {
                return action.todoId !== todo.id;
            });
        case 'EDIT_TODO': 
            return state.map((todo) => {
                if(action.todoId === todo.id){
                    return {
                        ...todo,
                        ...action.updates
                    }
                };
                return todo;
            })
        default: return state;
    }
}

export default todosReducer;