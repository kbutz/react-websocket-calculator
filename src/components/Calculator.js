import React from 'react';
import Button from './Button.js';
import Buttons from './Buttons.js';
import Screen from './Screen.js';

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      screenValue: '',
      output: '',
      history: [{msg: ''}],
      error: null,
    };

    this.handleClick = this.handleClick.bind(this);

  }

  handleClick(i){
    const value = this.state.screenValue + i; // get the value from the target element (button)
    this.setState({screenValue: value});

    switch (i) {
      case '=': { // if it's an equal sign, use the eval module to evaluate the question
        // convert the answer (in number) to String
        const answer = eval(this.state.screenValue).toString();
        // update answer in our state.
        const output = value + answer;
        this.ws.send('{"message":"' + output + '"}')
        this.setState({ screenValue: answer, output: output });
        break;
      }
      case 'AC': {
        // if it's the Cls sign, just clean our question and answer in the state
        this.setState({ screenValue: '', output: '' });
        break;
      }
      default: {
        // for every other commmand, update the answer in the state
        this.setState({ screenValue: value})
        break;
      }
    }
  }

  // <Screen question={this.state.question} answer={this.state.answer}/>

  renderButton(i, action) {
    return (
      <Button
        className='col-xs-2 btn-primary'
        value={i}
        onClick={() => this.handleClick(i)}
        type={action} />
    );
  }

  render() {

    const messageHistory = this.state.history.slice();
    const historyLength = messageHistory.length

    const showHistory = messageHistory.reverse().map((msg, index) => {
      if (index < 10 && historyLength > 1) {
        return (
          <li>
            {msg.msg}
          </li>
        );
      }
      return '';
    });

    return (
      <div className="row">
        <div className=" frame col-xs-8 col-xs-offset-2">
          <div className="calculator-title row">
            R_N Calculator
          </div>
          <Screen screenValue={this.state.screenValue} />
          <Buttons handleClick={this.handleClick}/>
        </div>

        {/* TODO: EntryLog component */}
        <div className="container">
          <div className="log">
            <ul>
              {this.state.error &&
              <li>
                <a onClick={() => this.setState({ error: null })} className="pull-right">x</a>
                {this.state.error}
              </li>}
              {showHistory}
            </ul>
          </div>
        </div>
      </div>
    );
  }

// this.ws = new WebSocket('ws://' + document.location.host + '/ws')
// this.ws.onopen = e => this.setState({history: this.state.history.concat([{msg: '{"message":"Connection Opened"}'}])})

  componentDidMount() {
      this.ws = new WebSocket('ws://' + 'localhost:8000' + '/ws')
      this.ws.onmessage = e => this.setState({history: this.state.history.concat([{msg: Object.values(JSON.parse(e.data))}])})
      this.ws.onerror = e => this.setState({ error: 'WebSocket error' })
      this.ws.onclose = e => !e.wasClean && this.setState({ error: `WebSocket error: ${e.code} ${e.reason}` })
    }

    componentWillUnmount() {
      this.ws.close()
    }
}

export default Calculator;
