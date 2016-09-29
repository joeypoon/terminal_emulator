import React, { Component } from 'react';

import Loader from './Loader';
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
    if (this.state.ready)
      return <Main />;
    return <Loader />
  }

  render() {
    return <div className="app-container">{ this.renderContent() }</div>;
  }
}