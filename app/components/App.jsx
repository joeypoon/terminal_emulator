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
  hi: "Hi there, I'm Joey."
})

const inputChoices = List([ "hi", "help", "about", "skills", "contact"])

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      history: List(),
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
      } else {
        let history = this.state.history.concat(line);
        if (this.state.history.size > 5) {
          history = this.state.history.shift()
        }
        this.setState({
          currentLine: "",
          history: history
        });
        clearInterval(this.interval);
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
                    history={this.state.history}
                    onInputChange={this.handleInputChange} />
        </div>
      </div>
    )
  }
}