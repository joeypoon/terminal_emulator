import { expect } from 'chai';
import makeStore from '../app/store';
import { Map, List } from 'immutable';
import { addToQueue, setInput } from '../app/action_creators';
import { dialogs, filler } from '../app/data';

describe('store', function() {

  beforeEach(function() {
    this.store = makeStore();
  });

  it('is a properly configured redux store', function() {
    const lines = List("I am a test.");
    expect(this.store.getState()).to.equal(Map());
    this.store.dispatch(addToQueue(lines));
    expect(this.store.getState().get('queue')).to.equal(lines);
  });

  it('properly handles valid input in middleware', function() {
    const event = { target: { value: "skills" } };
    const input = event.target.value;
    this.store.dispatch(setInput(event));
    expect(this.store.getState().get('queue')).to.equal(
      List.of(`$ ${input}`, filler).concat(dialogs.get(input)).push(filler)
    );
  });

  it('updates last activity after dispatch', function() {
    const event = { target: { value: "skills" } };
    const input = event.target.value;
    expect(this.store.getState()).to.equal(Map());
    this.store.dispatch(setInput(event));
    expect(this.store.getState().get('lastActivity')).to.be.ok;
  });

});