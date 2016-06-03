import { expect } from 'chai';
import Line from '../../app/components/Line';
import Link from '../../app/components/Link';
import React from 'react';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
  findRenderedDOMComponentWithTag
} from 'react-addons-test-utils';
import { filler } from '../../app/data';

describe('Line', function() {

  it('renders Link if line has http', function() {
    const props = { line: "http" };
    const component = renderIntoDocument(<Line {...props} />);
    const link = findRenderedComponentWithType(component, Link);
    expect(link).to.be.okay;
  });

  it('renders filler if line is filler', function() {
    const props = { line: filler };
    const component = renderIntoDocument(<Line {...props} />);
    const line = findRenderedDOMComponentWithTag(component, 'span');
    expect(line.className).to.contain('white-text');
    expect(line.textContent).to.contain(filler);
  });

  it('renders line if not filler or http', function() {
    const props = { line: 'I am a test' };
    const component = renderIntoDocument(<Line {...props} />);
    const line = findRenderedDOMComponentWithTag(component, 'span');
    expect(line.textContent).to.equal(props.line);
  });

});