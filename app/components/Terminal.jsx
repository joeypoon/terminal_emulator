import React from 'react';

export default class Terminal extends React.Component {
  render() {
    return(
      <div>
        {
          this.props.history.map(line =>
            <span key={line}>{line}</span>
          )
        }
        <span>{this.props.currentLine}</span>
      </div>
    )
  }
}