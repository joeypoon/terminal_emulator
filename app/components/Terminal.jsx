import React, { PropTypes } from 'react';
import Link from './Link';
import { filler } from '../data';

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
          this.props.lines.map((line, index) =>
            <div key={line + index}>
              {
                (this._isLink(line)) ?
                <Link text={line}
                      href={this._getLink(line)} /> :
                <span>{line}</span>
              }
            </div>
          )
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
  lines: PropTypes.object.isRequired,
  onInputChange: PropTypes.func.isRequired
}