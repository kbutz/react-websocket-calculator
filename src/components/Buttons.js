import React from 'react';
import Button from './Button.js';

class Buttons extends React.Component {
  renderButton(i, action) {
    return (
      <Button
        className='col-xs-2 btn-primary'
        value={i}
        onClick={() => this.props.handleClick(i)}
        type={action} />
    );
  }

  render() {
    return (
      <div className = "buttons">
        <div className="btn-row row">
          {this.renderButton('1', 'input')}
          {this.renderButton('2', 'input')}
          {this.renderButton('3', 'input')}
          {this.renderButton('4', 'input')}
          {this.renderButton('-', 'action')}
          {this.renderButton('+', 'action')}
        </div>
        <div className="btn-row row">
          {this.renderButton('5', 'input')}
          {this.renderButton('6', 'input')}
          {this.renderButton('7', 'input')}
          {this.renderButton('8', 'input')}
          {this.renderButton('*', 'action')}
          {this.renderButton('/', 'action')}
        </div>
        <div className="btn-row row">
          {this.renderButton('9', 'input')}
          {this.renderButton('.', 'input')}
          {this.renderButton('0', 'input')}
          {this.renderButton('AC', 'action')}
          {this.renderButton('=', 'action')}
        </div>
      </div>
    );
  }
}

export default Buttons;
