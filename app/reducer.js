import { Map, List } from 'immutable';

const INITIAL_STATE = Map();

export default function reducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case 'ADD_TO_QUEUE':
      return state.set('queue', state.get('queue', List())
                                     .concat(action.lines));
    case 'REMOVE_FROM_QUEUE':
      return state.set('queue', state.get('queue', List()).shift());
  }
  return state;
}