import { expect } from 'chai';
import React from 'react';
import AppBase from '../../app/components/App';
import Terminal from '../../app/components/Terminal';
import { renderIntoDocument, findRenderedComponentWithType } from 'react-addons-test-utils';
import { List } from 'immutable';

describe('App', function() {

  beforeEach(function() {
    const props = {
      lines: List.of("I am a test."),
      addToQueue: () => true,
      startNewLine: () => true,
      updateLastLine: () => true,
      setInput: () => true
    }
    this.component = renderIntoDocument(<AppBase {...props} />);
  });

  it('renders Terminal', function() {
    const terminal = findRenderedComponentWithType(this.component, Terminal);
    expect(terminal).to.be.okay;
  });

});