import React, { Component } from 'react';
import Terminal from './Terminal';
import { List } from 'immutable';
import * as actionCreators from '../action_creators';
import { filler, dialogs } from '../data';
import { connect } from 'react-redux';

const help = "Type 'help' for options.";

export default class MainBase extends Component {
  componentDidMount() {
    this.props.addToQueue(dialogs.get('intro'));
    this.props.addToQueue(filler);
    this._startRenderingQueue();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  _scrollToBottom() {
    var terminal = document.getElementsByClassName("terminal")[0];
    terminal.scrollTop = terminal.scrollHeight;
  }

  _getCurrentLine() {
    const lines = this.props.lines;
    // last line is always an empty string
    return lines.get(lines.size - 2);
  }

  _startRenderingQueue() {
    this.interval = setInterval( () => {
      const nextLine = this.props.queue.first();
      if (nextLine !== undefined) {
        this._scrollToBottom();
        if (nextLine === this.props.lines.last()) {
          this.props.startNewLine();
          this.props.removeFromQueue();
        } else {
          this.props.updateLastLine();
        }
      }
      if (new Date * 1 - this.props.lastActivity > 5000) {
        if (this._getCurrentLine() !== help)
          this.props.addToQueue(help);
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

export const Main = connect(mapStateToProps, actionCreators)(MainBase);
