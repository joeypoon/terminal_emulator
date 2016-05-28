import React from 'react';
import Terminal from './Terminal';
import { Map, List, fromJS } from 'immutable';

const styles = {
  TerminalContainer: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    width: "33%",
    height: "50%"
  }
}

const dialogs = fromJS({
  hi: "Hi there, I'm Joey.",
})

const inputChoices = List([ "hi", "help", "about", "skills", "contact"])

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      currentLine: ""
    }
  }

  componentDidMount() {
    this.handleInputChange("hi");
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  _printLine(input) {
    const line = dialogs.get(input)
    this.interval = setInterval( () => {
      if (this.state.currentLine !== line) {
        this.setState({
          currentLine: this.state.currentLine + line.charAt(this.state.currentLine.length)
        })
      }
    }, 30)
  }

  handleInputChange(input) {
    this._printLine(input);
  }

  render() {
    return(
      <div>
        <div style={styles.TerminalContainer}>
          <Terminal currentLine={this.state.currentLine}
                    onInputChange={this.handleInputChange} />
        </div>
      </div>
    )
  }
}