import React, { PropTypes } from 'react';

export default class Link extends React.Component {

  render() {
    return <div>
      {this.props.text.replace(this.props.href, '')}
      <a href={this.props.href} target="_blank">
        {this.props.href}
      </a>
    </div>
  }
}

Link.propTypes = {
  text: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired
};