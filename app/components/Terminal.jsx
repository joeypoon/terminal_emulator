import React from 'react';

export default class Terminal extends React.Component {
  render() {
    return(
      <div>
        {this.props.currentLine}
      </div>
    )
  }
}