import React, { PropTypes } from 'react';
import Line from './Line';

export default class Terminal extends React.Component {

  constructor() {
    super()
    this.interval = setInterval(() => {
      this.refs.inputBox.focus()
    }, 200);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return(
      <div className="terminal">
        {
          this.props.lines.map((line, index) => {
            return <Line key={line + index} line={line} />
          })
        }
        <div class="clearfix"></div>
        $<input type="text"
               className="inputBox"
               ref="inputBox"
               autoFocus={true}
               onChange={this.props.onInputChange} />
      </div>
    )
  }
}

Terminal.propTypes = {
  lines: PropTypes.object.isRequired,
  onInputChange: PropTypes.func.isRequired
}