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
      lines: List(),
    }

    this.handleInputChange = e => {
      const input = e.target.value.toLowerCase()
      if (inputChoices.indexOf(input) > -1) {
        store.dispatch(addToQueue(`$ ${input}`));
        store.dispatch(addToQueue(filler));
        store.dispatch(addToQueue(dialogs.get(input)));
        e.target.value = "";
        store.dispatch(addToQueue(filler));
      }
    }
  }

  componentDidMount() {
    store.dispatch(addToQueue(dialogs.get('intro')));
    store.dispatch(addToQueue(filler));
    this._startRenderingQueue();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  _startRenderingQueue() {
    this.interval = setInterval( () => {
      const line = store.getState().getIn(['queue', 0]);
      if (line !== undefined) {
        if (line === this.state.lines.last()) {
          store.dispatch(removeFromQueue());
          this.setState({
            lines: this.state.lines.concat("")
          });
        } else {
          const updatedLine = line.slice(0, this.state.lines.get(-1, "").length + 1);
          this.setState({
            lines: this.state.lines.set(-1, updatedLine)
          });
        }
      }
    }, 30)
  }

  render() {
    return(
      <div className="terminal">
        <Terminal lines={this.state.lines}
                  onInputChange={this.handleInputChange} />
      </div>
    )
  }
}