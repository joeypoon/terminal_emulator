import { expect } from 'chai';
import { Map, fromJS, List } from 'immutable';
import reducer from '../app/reducer';

describe('reducer', () => {

  it('handles update history', () => {

    const initialState = Map();
    const action = {
      type: 'UPDATE_HISTORY',
      line: 'I am a test'
    };
    const nextState = reducer(initialState, action);
    expect(nextState).to.equal(fromJS({
      history: List.of(action.line)
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