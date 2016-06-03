import { expect } from 'chai';
import Terminal from '../../app/components/Terminal';
import Line from '../../app/components/Line';
import { List } from 'immutable';
import React from 'react';
import { renderIntoDocument,
  findRenderedDOMComponentWithTag,
  scryRenderedComponentsWithType,
  Simulate
} from 'react-addons-test-utils';

describe('Terminal', function() {

  beforeEach(function() {
    this.invoked;
    this.props = {lines: List.of("test", "test2"), onInputChange: () => this.invoked = true};
    this.component = renderIntoDocument(<Terminal {...this.props} />);
  });

  it('renders the correct number of lines', function() {
    const lines = scryRenderedComponentsWithType(this.component, Line);
    expect(lines.length).to.equal(2);
  });

  it('renders an input box', function() {
    const input = findRenderedDOMComponentWithTag(this.component, 'input');
    expect(input).to.be.ok;
  });

  it('invokes a callback when input is changed', function() {
    const input = findRenderedDOMComponentWithTag(this.component, 'input');
    expect(this.invoked).to.not.be.true;
    Simulate.change(input);
    expect(this.invoked).to.be.true;
  });

});