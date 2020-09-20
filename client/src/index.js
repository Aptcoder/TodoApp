import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import 'normalize.css/normalize.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/styles.scss'
import './index.css';
import AppRouter from '../src/routers/AppRouter';
import * as serviceWorker from './serviceWorker';
import configureStore from './store/config';
import {getUserProfile} from './actions/auth'
import {startSetTodos} from './actions/todos'
import gif from './loading2.gif'
const store = configureStore();
const jsx = (
  <Provider store={store}>
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
  </Provider>
)
const renderApp = function (){
  ReactDOM.render(jsx,document.getElementById('root'));
}

const authToken = localStorage.getItem('token');
  if(authToken){
      ReactDOM.render(<div className='loading-gif'><img alt='loading gif' src={gif}/></div>,document.getElementById('root'));
      store.dispatch(getUserProfile(authToken))
      .then(() => {
        store.dispatch((startSetTodos(authToken)))
        .then(() => {
          renderApp();
        })
        .catch(() => {
          ReactDOM.render(<div>Could not get todos</div>,document.getElementById('root'));
        })
      })
      .catch(() => {
        renderApp()
      })
  }
  else {
    renderApp()
  }




// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
