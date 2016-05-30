import { Map, List, fromJS } from 'immutable';

const INITIAL_STATE = fromJS({
  history: [],
  queue: []
});

function updateHistory(historyState = List(), line) {
  let nextHistoryState = historyState.concat(line);
  if (historyState.size > 12) {
    nextHistoryState = nextHistoryState.shift();
  }
  return nextHistoryState;
}

export default function reducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case 'UPDATE_HISTORY':
      return state.set('history', updateHistory(state.get('history'), action.line));
    case 'ADD_TO_QUEUE':
      return state.set('queue', state.get('queue')
                                     .concat(action.lines)
                                     .concat(""));
    case 'REMOVE_FROM_QUEUE':
      return state.set('queue', state.get('queue').shift());
  }
  return state;
}