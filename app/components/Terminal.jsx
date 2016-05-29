import React, { PropTypes } from 'react';

const styles = {
  inputBox: {
    border: "none",
    marginLeft: -12
  }
}

export default class Terminal extends React.Component {

  onChange(e) {
    console.log(e)
  }

  render() {
    return(
      <div>
        {
          this.props.history.map(line =>
            <div key={line}>
              <span>{line}</span>
              <br />
            </div>
          )
        }
        <span>{this.props.text}</span>
        <br />
        <br />
        <input type="text"
               className="form-control"
               style={styles.inputBox}
               placeholder="Try 'help'"
               autoFocus={true} />
      </div>
    )
  }
}

Terminal.propTypes = {
  text: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
  onInputChange: PropTypes.func.isRequired
}