import { expect } from 'chai';
import Link from '../../app/components/Link';
import React from 'react';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithTag
} from 'react-addons-test-utils';

describe('Link', function() {

  beforeEach(function() {
    this.component = renderIntoDocument(<Link line="key: http://value.com/" />);
  });

  it('renders key in proper format', function() {
    const span = findRenderedDOMComponentWithTag(this.component, 'span');
    expect(span).to.be.okay;
    expect(span.textContent).to.equal('key: ');
  });

  it('renders anchor properly', function() {
    const anchor = findRenderedDOMComponentWithTag(this.component, 'a');
    expect(anchor).to.be.okay;
    expect(anchor.href).to.equal('http://value.com/');
    expect(anchor.textContent).to.equal('http://value.com/');
  });

});