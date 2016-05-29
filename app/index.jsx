import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { createStore } from 'redux';
import reducer from './reducer';

export const store = createStore(reducer);

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
