//dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk'
//components
import App from './App';
import registerServiceWorker from './registerServiceWorker';
//css
import './index.css';
//reducers
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import order from './store/reducers/order';
import authReducer from './store/reducers/auth'

const rootReducer = combineReducers({burgerBuilder: burgerBuilderReducer, order: order, auth: authReducer}) 

//using the process... stuff makes it so you can only use redux devtools in development mode
const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;
const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)
));

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)

ReactDOM.render( app, 
document.getElementById('root'));
registerServiceWorker();
