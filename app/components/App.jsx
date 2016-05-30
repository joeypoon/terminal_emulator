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
    height: "50%",
    color: "#2c3e50"
  }
}

function getKeys(map) {
  return Object.keys(map.toJS());
}

const inputChoices = [
  'help', 'skills', 'contact',
  'portfolio', 'resume', 'github', 'twitter',
  'linkedin', 'blog'
];

const dialogs = fromJS({
  intro: [
    "Hi there, I'm Joey.",
    "I write code for a living and for fun.",
    "Type 'help' to learn more."
  ],

  help: [
    "Available commands:",
    `[ ${inputChoices.join(', ')} ]`
  ],

  skills: [
    "$ npm install react angular",
    "$ rails new restful_api",
    "$ git commit -m 'git awesome.'"
  ],

  contact: [
    "phone: 281-942-8891",
    "email: joey@joeypoon.com"
  ]
})

const links = fromJS({
  portfolio: "http://joeypoon.com/",
  resume: "http://joeypoon.com/resume/",
  github: "https://github.com/joeypoon",
  twitter: "https://twitter.com/joeyfpoon",
  linkedin: "https://www.linkedin.com/in/joeypoon",
  blog: "http://joeypoon.com/blog/"
})

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      history: List(),
      text: "",
      input: ""
    }

    this.handleInputChange = e => {
      const input = e.target.value.toLowerCase()
      this.setState({
        input: input
      });
      if (inputChoices.indexOf(input) > -1) {
        store.dispatch(addToQueue(`$ ${input}`))
        if (this._isLink(input)) {
          this._openLink(input)
        } else {
          store.dispatch(addToQueue(dialogs.get(input)));
        }
        this.setState({
          input: ""
        });
        e.target.value = "";
      }
    }

    this.handleStateChange = () => {
      this.setState({
        history: store.getState().get('history')
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
            text: "",
            input: ""
          });
        }
      }
    }, 30)
  }

  componentDidMount() {
    store.subscribe(this.handleStateChange);
    store.dispatch(addToQueue(dialogs.get('intro')));
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  _isLink(input) {
    return !!links.get(input)
  }

  _openLink(link) {
    window.open(links.get(link));
  }

  render() {
    return(
      <div style={styles.terminal}>
        <Terminal text={this.state.text}
                  history={this.state.history}
                  input={this.state.input}
                  onInputChange={this.handleInputChange} />
      </div>
    )
  }
}