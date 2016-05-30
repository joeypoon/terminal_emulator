import React, { PropTypes } from 'react';

const styles = {
  inputBox: {
    border: "none",
    color: "white",
    outline: "none"
  }
}

export default class Terminal extends React.Component {
  constructor() {
    super()
    this.interval = setInterval(() => {
      this.refs.inputBox.focus();
    }, 200);
  }

  render() {
    return(
      <div>
        {
          this.props.history.map((line, index) =>
            <div key={line + index}>
              <span>{line}</span>
              <br />
            </div>
          )
        }
        <span>{this.props.text}</span>
        <br />
        <br />
        <span>{this.props.input}</span>
        <input type="text"
               style={styles.inputBox}
               ref="inputBox"
               autoFocus={true}
               onChange={this.props.onInputChange} />
      </div>
    )
  }
}

Terminal.propTypes = {
  text: PropTypes.string.isRequired,
  input: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
  onInputChange: PropTypes.func.isRequired
}