import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux';
import makeStore from './store';

require("./styles/styles.css");

ReactDOM.render(
  <Provider store={makeStore()}>
    <App />
  </Provider>,
  document.getElementById('app')
);
