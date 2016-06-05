import { expect } from 'chai';
import { Map, fromJS, List } from 'immutable';
import reducer from '../app/reducer';
import { MAX_LINES } from '../app/data';

describe('reducer', () => {

  describe('start new line', () => {

    it('correctly begins new line', () => {
      const initialState = fromJS({ lines: ["I am a test."] });
      const action = { type: 'START_NEW_LINE' };
      const nextState = reducer(initialState, action);
      expect(nextState).to.equal(fromJS({ lines: ["I am a test.", ""] }));
    });

    it('restricts size to MAX_LINES', () => {
      const lines = new Array(MAX_LINES);
      const initialState = fromJS({lines});
      const action = {
        type: "START_NEW_LINE"
      };
      const nextState = reducer(initialState, action);
      expect(nextState.get('lines', List()).size).to.equal(MAX_LINES);
    });

  });

  it('handles update last line', () => {
    const initialState = fromJS({
      lines: ["I am a test.", "Awesom"],
      queue: ["Awesome"]
    });
    const action = { type: "UPDATE_LAST_LINE" };
    const nextState = reducer(initialState, action);
    expect(nextState).to.equal(fromJS({
      lines: ["I am a test.", "Awesome"],
      queue: ["Awesome"]
    }));
  });

  it('handles add to queue', () => {
    const initialState = Map();
    const action = {
      type: 'ADD_TO_QUEUE',
      lines: List.of('I am a test.')
    };
    const nextState = reducer(initialState, action);
    expect(nextState).to.equal(fromJS({
      queue: List.of('I am a test.')
    }));
  });

  it('handles remove from queue', () => {
    const initialState = fromJS({
      queue: List.of('I am a test.')
    });
    const action = {
      type: 'REMOVE_FROM_QUEUE'
    };
    const nextState = reducer(initialState, action);
    expect(nextState).to.equal(fromJS({
      queue: List()
    }));
  });

});