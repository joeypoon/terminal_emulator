import React from 'react';
import Terminal from './Terminal';
import { List, Map, fromJS } from 'immutable';
import { store } from '../index';
import { addToQueue, removeFromQueue, updateHistory } from '../action_creators';

const inputChoices = [
  'help', 'skills', 'experience', 'contact', 'links',
  'open:linkName (eg. open:portfolio)'
];

const links = fromJS({
  portfolio: "http://joeypoon.com/portfolio#portfolio",
  resume: "http://joeypoon.com/resume/",
  github: "https://github.com/joeypoon",
  twitter: "https://twitter.com/joeyfpoon",
  linkedin: "https://www.linkedin.com/in/joeypoon",
  blog: "http://joeypoon.com/blog/"
})

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

  experience: [
    "Erdos Miller:",
    "Software Engineer (July 2015 - Current)",
    "",
    "The Iron Yard:",
    "Backend Engineer (May 2015 - July 2015)",
    "",
    "University of Houston Downtown:",
    "Software Developer (May 2015 - July 2015)",
  ],

  contact: [
    "phone: 281-942-8891",
    "email: joey@joeypoon.com"
  ],

  links: links.map((value, key) => `${key}: ${value}`)
})

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
        store.dispatch(addToQueue(`$ ${input}`))
        if (this._isLink(input)) {
          this._openLink(input)
        } else {
          store.dispatch(addToQueue(dialogs.get(input)));
        }
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
            text: ""
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
    return !!links.get(input.split(':')[1])
  }

  _openLink(input) {
    window.open(links.get(input.split(':')[1]));
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