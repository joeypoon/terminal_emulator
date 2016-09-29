import React from 'react';
import Terminal from './Terminal';
import { List } from 'immutable';
import * as actionCreators from '../action_creators';
import { filler, MAX_LINES, dialogs } from '../data';
import { connect } from 'react-redux';

export default class AppBase extends React.Component {

  componentDidMount() {
    this.props.addToQueue(dialogs.get('intro'));
    this.props.addToQueue(filler);
    this._startRenderingQueue();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  _startRenderingQueue() {
    this.interval = setInterval( () => {
      const nextLine = this.props.queue.first();
      if (nextLine !== undefined) {
        if (nextLine === this.props.lines.last()) {
          this.props.startNewLine();
          this.props.removeFromQueue();
        } else {
          this.props.updateLastLine();
        }
      }
      if (new Date * 1 - this.props.lastActivity > 8000) {
        this.props.addToQueue("Type 'help' for options.");
      }
    }, 30)
  }

  render() {
    return(
      <div>
        <Terminal lines={this.props.lines}
                  onInputChange={this.props.setInput} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    queue: state.get('queue', List()),
    lines: state.get('lines', List()),
    lastActivity: state.get('lastActivity', new Date * 1)
  }
}

export const App = connect(mapStateToProps, actionCreators)(AppBase);
