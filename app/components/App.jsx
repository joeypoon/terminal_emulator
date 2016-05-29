import React from 'react';
import Terminal from './Terminal';
import { List, Map, fromJS } from 'immutable';
import { store } from '../index';
import { addToQueue, removeFromQueue, updateHistory } from '../action_creators';

const styles = {
  terminal: {
    fontFamily: ["Lucida Console", "Lucida Sans Typewriter", "monaco", "Bitstream Vera Sans Mono", "monospace"],
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    width: "40%",
    height: "50%"
  }
}

const dialogs = fromJS({
  about: [
    "Hi there, I'm Joey."
  ]
})

const inputChoices = List.of("about");

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      history: List(),
      text: "",
      input: ""
    }

    this.handleInputChange = input => {
      if (inputChoices.indexOf(input) > -1) {
        store.dispatch(addToQueue(dialogs.get(input)));
      }
    }

    this.handleStateChange = () => {
      this.setState({
        history: store.getState().get('history')
      });
    }

    this.interval = setInterval( () => {
      const line = store.getState().getIn(['queue', 0]);
      if (line) {
        this.setState({
          text: this.state.text + line.charAt(this.state.text.length)
        });
        if (this.state.text === line) {
          store.dispatch(updateHistory(line));
          store.dispatch(removeFromQueue());
          this.setState({
            text: "",
            input: ""
          });
        }
      }
    }, 40)
  }

  componentDidMount() {
    store.subscribe(this.handleStateChange);
    this.handleInputChange("about");
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return(
      <div style={styles.terminal}>
        <Terminal text={this.state.text}
                  history={this.state.history}
                  onInputChange={this.handleInputChange} />
      </div>
    )
  }
}