import React, { PropTypes } from 'react';
import Link from './Link';
import { filler } from '../data';

export default class Line extends React.Component {

  _isLink() {
    return this.props.line.indexOf('http') > -1;
  }

  _lineType() {
    if (this._isLink()) {
      return <Link line={this.props.line} />
    } else if (this.props.line === filler) {
      return <span className="white-text">{filler}</span>
    } else {
      return <span>{this.props.line}</span>
    }
  }

  render() {
    return <div>
      {this._lineType()}
    </div>
  }
}

Line.propTypes = {
  line: PropTypes.string.isRequired
}