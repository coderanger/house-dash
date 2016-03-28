import 'babel-polyfill';
import 'isomorphic-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/app';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from './reducers';

if(module.hot) {
  module.hot.accept();
}

const loggerMiddleware = createLogger();

const store = createStore(
  rootReducer,
  {},
  compose(
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware
    ),
    (typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f)
  )
);

ReactDOM.render(
  <Provider store={store}><App/></Provider>,
  document.getElementById('root')
);
