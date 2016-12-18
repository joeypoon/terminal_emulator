import { Map, List } from 'immutable';
import { MAX_LINES } from './data';

const INITIAL_STATE = Map();

function nextLineState(lines, queue) {
  const lastLine = lines.get(-1, "");
  const nextChar = queue.get(0, "").charAt(lastLine.length);
  return lastLine + nextChar;
}

export default function reducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case 'START_NEW_LINE':
      return state.update('lines', List(), (lines) => lines.concat(""));
    case 'UPDATE_LAST_LINE':
      return state.update('lines', List(), (lines) => {
        return lines.pop()
                    .push(nextLineState(lines, state.get('queue', List())));
      });
    case 'ADD_TO_QUEUE':
      return state.update('queue', List(), (queue) => queue.concat(action.lines));
    case 'REMOVE_FROM_QUEUE':
      return state.update('queue', List(), (queue) => queue.shift());
    case 'UPDATE_LAST_ACTIVITY':
      return state.set('lastActivity', new Date * 1)
  }
  return state;
}