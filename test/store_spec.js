import { expect } from 'chai';
import makeStore from '../app/store';
import { Map, List } from 'immutable';
import { addToQueue, setInput } from '../app/action_creators';
import { dialogs, filler, MAX_LINES } from '../app/data';

describe('store', function() {

  beforeEach(function() {
    this.store = makeStore();
  });

  it('is a properly configured redux store', function() {
    const lines = List("I am a test.");
    expect(this.store.getState()).to.equal(Map());
    this.store.dispatch(addToQueue(lines));
    expect(this.store.getState()).to.equal(Map({
      queue: lines
    }));
  });

  it('properly handles valid input in middleware', function() {
    const event = { target: { value: "skills" } };
    const input = event.target.value
    this.store.dispatch(setInput(event));
    expect(this.store.getState()).to.equal(Map({
      queue: List.of(`$ ${input}`, filler).concat(dialogs.get(input)).push(filler)
    }));
  });

});