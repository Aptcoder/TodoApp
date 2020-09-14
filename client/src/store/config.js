import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import authReducer from '../reducers/authReducer';
import todosReducer from '../reducers/todosReducer';
import thunk from 'redux-thunk'

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default () => {
    const store = createStore(combineReducers({
        todos: todosReducer,
        auth: authReducer
    
    }),
    composeEnhancer(applyMiddleware(thunk))
    );
    
    return store;
}
