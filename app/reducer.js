import { Map, List, fromJS } from 'immutable';

const INITIAL_STATE = Map();

function updateHistory(historyState = List(), line) {
  let nextHistoryState = historyState.concat(line);
  if (historyState.size > 8) {
    nextHistoryState = nextHistoryState.shift();
  }
  return nextHistoryState;
}

export default function reducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case 'UPDATE_HISTORY':
      return state.set('history', updateHistory(state.get('history', List()), action.line));
    case 'ADD_TO_QUEUE':
      return state.set('queue', state.get('queue', List())
                                     .concat(action.lines));
    case 'REMOVE_FROM_QUEUE':
      return state.set('queue', state.get('queue', List()).shift());
  }
  return state;
}