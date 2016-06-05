import { createStore, applyMiddleware } from 'redux';
import reducer from './reducer';
import remoteActionMiddleware from './remote_action_middleware';

const createStoreWithMiddleware = applyMiddleware(
  remoteActionMiddleware
)(createStore);

export default function makeStore() {
  return createStoreWithMiddleware(reducer);
}
