import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { createStore } from 'redux';
import reducer from './reducer';

require("./styles.css");

export const store = createStore(reducer);

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
