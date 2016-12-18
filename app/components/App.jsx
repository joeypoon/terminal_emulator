import React, { Component } from 'react';

import { Main } from './Main';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { ready: false };
  }

  componentDidMount() {
    setTimeout(() => this.setState({ ready: true }), 2500);
  }

  renderContent() {
    return <Main />;
  }

  render() {
    return <div>{ this.renderContent() }</div>;
  }
}