import React from 'react';
import Terminal from './Terminal';
import { List, Map, fromJS } from 'immutable';
import { store } from '../index';
import { addToQueue, removeFromQueue, updateHistory } from '../action_creators';
import { inputChoices, links, dialogs, filler } from '../data';

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      history: List(),
      text: ""
    }

    this.handleInputChange = e => {
      const input = e.target.value.toLowerCase()
      if (inputChoices.indexOf(input) > -1 || this._isLink(input)) {
        store.dispatch(addToQueue(`$ ${input}`));
        store.dispatch(addToQueue(filler));
        if (this._isLink(input)) {
          store.dispatch(addToQueue(links.get(input.split(':')[1])));
        } else {
          store.dispatch(addToQueue(dialogs.get(input)));
        }
        e.target.value = "";
        store.dispatch(addToQueue(filler));
      }
    }

    this.handleStateChange = () => {
      this.setState({
        history: store.getState().get('history', List())
      });
    }

    this.interval = setInterval( () => {
      const line = store.getState().getIn(['queue', 0]);
      if (line !== undefined) {
        this.setState({
          text: this.state.text + line.charAt(this.state.text.length)
        });
        if (this.state.text === line) {
          store.dispatch(updateHistory(line));
          store.dispatch(removeFromQueue());
          this.setState({
            text: ""
          });
        }
      }
    }, 30)
  }

  componentDidMount() {
    store.subscribe(this.handleStateChange);
    store.dispatch(addToQueue(dialogs.get('intro')));
    store.dispatch(addToQueue(filler));
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  _isLink(input) {
    return !!links.get(input.split(':')[1])
  }

  render() {
    return(
      <div className="terminal">
        <Terminal text={this.state.text}
                  history={this.state.history}
                  onInputChange={this.handleInputChange} />
      </div>
    )
  }
}