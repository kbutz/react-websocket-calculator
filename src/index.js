import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// Start calculator components

function ScreenRow(props) {
  return (
    <div className="row">
      <input className={`${props.className} col-xs-12`} type="text" readOnly value={props.value}/>
    </div>
  );
}

//<ScreenRow className='output-screen' value={props.answer}/>

function Screen(props) {
  return (
    <div className="screen row">
    <ScreenRow className='input-screen' value={props.question}/>
    </div>
  );
}

function Button(props) {
  return (
    <button className="button" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: '',
      answer: '',
      history: [{msg: ''}],
      error: null,
    };

    // this.handleClick = this.handleClick.bind(this);

  }

  handleClick(i){
    const value = this.state.question + i; // get the value from the target element (button)
    this.setState({question: value});

    switch (i) {
      case '=': { // if it's an equal sign, use the eval module to evaluate the question
        // convert the answer (in number) to String
        const answer = eval(this.state.question).toString();
        // update answer in our state.
        const output = value + answer;
        this.ws.send('{"message":"' + output + '"}')
        this.setState({ question: answer, answer: output });
        break;
      }
      case 'AC': {
        // if it's the Cls sign, just clean our question and answer in the state
        this.setState({ question: '', answer: '' });
        break;
      }
      default: {
        // for every other commmand, update the answer in the state
        this.setState({ question: value})
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
    });

    return (
      <div className="row">
        <div className=" frame col-xs-8 col-xs-offset-2">
          <div className="calculator-title row">
            R_N Calculator
          </div>
          <Screen question={this.state.question} answer={this.state.answer}/>
          {/* TODO: Buttons component*/}
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

function SubmissionLog(props) {
  return (
    <div className="row">
      <input className={`${props.className} col-xs-12`} type="text" readOnly value={props.value}/>
    </div>
  );
}

// ========================================



ReactDOM.render(
  <Calculator />,
  document.getElementById('root')
);
