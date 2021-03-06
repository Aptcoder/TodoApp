import axios from 'axios';

export const addTodo = (todo = {}) => {
    return {
        type: 'ADD_TODO',
        todo
    }
}

export const removeTodo = (todoId) => {
    return {
        type: 'REMOVE_TODO',
        todoId
    }
}

export const editTodo = (todoId, todoUpdates) => {
    return {
        type: 'EDIT_TODO',
        todoId,
        updates: todoUpdates
    }
}

export const setTodos = (todos) => {
    return {
        type: 'SET_TODOS',
        todos
    }
}

export const startSetTodos = (token) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            axios.get('/api/user/todos', {
                headers: {
                    'x-auth': token
                }
            })
            .then((response) => {
                const {todos} = response.data.data
                dispatch(setTodos(todos))
                resolve()
            })
            .catch((error) => {
                    // handle error
                reject();
            })
        })
    }
}

export const startAddTodo = (todo) => {
    return (dispatch, getState) => {
        const state = getState()
        return new Promise((resolve, reject) => {
            axios.post('/api/user/todos',
        {
            title: todo.title,
            description: todo.description,
            todoAt: todo['date-time'], 
        }, 
        {
            headers: {
                'x-auth': state.auth.authToken
            }
        })
        .then((response) => {
            const {todo} = response.data.data;
            dispatch(addTodo(todo));
            resolve(response.data.message);
        })
        .catch((error) => {
            if(error.response){
                reject(error.response.data.message)
            }
            else {
                reject('Could not add todo, try again later')
            }
        })
        })
        
    }
}

export const startTodoEdit = (todo,todoId) => {
    return (dispatch, getState) => {
        const state = getState();
        return new Promise((resolve, reject) => {
            axios.put(`/api/user/todos/${todoId}`,
        {
            title: todo.title,
            description: todo.description,
            todoAt: todo['date-time'], 
        }, 
        {
            headers: {
                'x-auth': state.auth.authToken
            }
        })
        .then((response) => {
            // const {todo} = response.data.data;
            // console.log('todo', todo);
            dispatch(editTodo(todoId,{
                title: todo.title,
                description: todo.description,
                todoAt: todo['date-time'], 
            }));
            resolve(response.data.message);
        })
        .catch((error) => {
            if(error.response){
                reject(error.response.data.message)
            }
            else {
                reject('Could not edit todo, try again later')
            }
        })
        })
    }
}


export const startDeleteTodo = (todoId) => {
    return (dispatch, getState) => {
        const state = getState()
        return new Promise((resolve, reject) => {
            axios.delete(`/api/user/todos/${todoId}`, {
                headers: {
                    'x-auth': state.auth.authToken
                }
            })
            .then((response) => {
                dispatch(removeTodo(todoId));
                resolve(response.data.message)
            })
            .catch((error) => {
                if(error.response){
                    reject(error.response.data.message)
                }
                else {
                    reject('Could not edit todo, try again later')
                }
            })
        })
    }
}

export const startCompleteTodo = (todoId, current) => {
    return (dispatch, getState) => {
        const state = getState();
        return new Promise((resolve, reject) => {
            axios.put(`/api/user/todos/${todoId}`,
        {
            isCompleted: !current
        }, 
        {
            headers: {
                'x-auth': state.auth.authToken
            }
        })
        .then((response) => {
            dispatch(editTodo(todoId,{isCompleted: !current}));
            resolve(response.data.message);
        })
        .catch((error) => {
            if(error.response){
                reject(error.response.data.message)
            }
            else {
                reject('Could not edit todo, try again later')
            }
        })
        })
    }
}
