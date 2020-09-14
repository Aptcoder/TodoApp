import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/styles.scss'
import './index.css';
import AppRouter from '../src/routers/AppRouter';
import * as serviceWorker from './serviceWorker';
import configureStore from './store/config';

const store = configureStore();
const jsx = (
  <Provider store={store}>
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
  </Provider>
)
  
ReactDOM.render(jsx,document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
