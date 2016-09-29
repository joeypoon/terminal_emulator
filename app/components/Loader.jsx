import React, { Component } from 'react';

export default class Loader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cupPosition: 'down',
            text: ''
        };
        this.interval = setInterval(() => {
            this.updateCupPosition();
            this.updateText();
        }, 350);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    updateCupPosition() {
        this.setState({
            cupPosition: this.getCupPosition()
        });
    }

    getCupPosition() {
        return this.state.cupPosition === 'down' ? 'up' : 'down';
    }

    updateText() {
        if (this.state.text === '...')
            this.resetText();
        this.incrementPeriod();
    }

    incrementPeriod() {
        this.setState({ text: this.state.text + '.' })
    }

    resetText() {
        this.setState({ text: '' });
    }

    shouldDisplayCup(position) {
        if (this.state.cupPosition === position)
            return 'block';
        return 'none';
    }

    render() {
        return <div className="loader">
            <img src='http://joeypoon.com/alpacasama-cup-up.png'
                style={{ height: 300, display: this.shouldDisplayCup('up') }} />
            <img src='http://joeypoon.com/alpacasama-cup-down.png'
                style={{ height: 300, display: this.shouldDisplayCup('down') }} />
            <div>Loading{ this.state.text }</div>
        </div>;
    }
}