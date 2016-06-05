import { MAX_LINES, inputChoices, filler, dialogs } from './data';
import { setInput, addToQueue } from './action_creators';
import { List } from 'immutable';

export default store => next => action => {
  let input;
  if (action.event && inputChoices.indexOf(input = action.event.target.value.toLowerCase()) > -1) {
    store.dispatch(addToQueue(`$ ${input}`));
    store.dispatch(addToQueue(filler));
    store.dispatch(addToQueue(dialogs.get(input)));
    store.dispatch(addToQueue(filler));
    action.event.target.value = "";
  }
  return next(action);
}
