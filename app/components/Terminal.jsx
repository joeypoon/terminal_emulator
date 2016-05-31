import React, { PropTypes } from 'react';
import Link from './Link';

export default class Terminal extends React.Component {
  constructor() {
    super()
    this.interval = setInterval(() => {
      this.refs.inputBox.focus();
    }, 200);
  }

  _isLink(text) {
    return text.indexOf('http') > -1
  }

  _getLink(text) {
    const index = text.indexOf('http');
    return text.slice(index)
  }

  render() {
    return(
      <div>
        {
          this.props.history.map((text, index) =>
            <div key={text + index}>
              {
                (this._isLink(text)) ?
                <Link text={text}
                      href={this._getLink(text)} /> :
                <span>{text}</span>
              }
            </div>
          )
        }
        {
          (this._isLink(this.props.text)) ?
          <Link text={this.props.text}
                href={this._getLink(this.props.text)} /> :
          <span>{this.props.text}</span>
        }
        <div class="clearfix"></div>
        $<input type="text"
               className="inputBox"
               ref="inputBox"
               autoFocus={true}
               onChange={this.props.onInputChange} />
      </div>
    )
  }
}

Terminal.propTypes = {
  text: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
  onInputChange: PropTypes.func.isRequired
}