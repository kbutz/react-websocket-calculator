import React from 'react';
import Button from './Button.js';

class Buttons extends React.Component {
  renderButton(i, className) {
    return (
      <Button
        className={className}
        value={i}
        onClick={() => this.props.handleClick(i)} />
    );
  }

  render() {
    return (
      <div className = "buttons-wrapper">
        <div className="digits flex">
          {this.renderButton('9', '')}
          {this.renderButton('8', '')}
          {this.renderButton('7', '')}
          {this.renderButton('6', '')}
          {this.renderButton('5', '')}
          {this.renderButton('4', '')}
          {this.renderButton('3', '')}
          {this.renderButton('2', '')}
          {this.renderButton('1', '')}
          {this.renderButton('0', 'wide')}
          {this.renderButton('.', '')}
        </div>
        <div className="modifiers subgrid">
          {this.renderButton('AC', 'wide')}
        </div>
        <div className="operations subgrid">
          {this.renderButton('-', '')}
          {this.renderButton('+', '')}
          {this.renderButton('*', '')}
          {this.renderButton('/', '')}
          {this.renderButton('=', '')}
        </div>
      </div>
    );
  }
}

export default Buttons;
