import React, { PropTypes } from 'react';

export default class Link extends React.Component {

  _getLink() {
    const str = this.props.line;
    const index = str.indexOf('http');
    return str.slice(index);
  }

  render() {
    return <div>
      <span>
        {this.props.line.replace(this._getLink(), '')}
      </span>
      <a href={this._getLink()} target="_blank">
        {this._getLink()}
      </a>
    </div>
  }
}

Link.propTypes = {
  line: PropTypes.string.isRequired
};