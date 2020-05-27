import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
  }

  onIncrement() {
    this.setState((state) => ({ counter: state.counter + 1 }));
  }

  onDecrement() {
    this.state.counter !== 0
      ? this.setState((state) => ({ counter: state.counter - 1 }))
      : console.log("Error");
  }

  render() {
    return (
      <div attr-test="component-app">
        <h1>Learn React Testing-Counter</h1>
        <br />
        <div attr-test="display-counter">
          The counter is: {this.state.counter}
        </div>
        <br />
        <button
          attr-test="increment-button"
          onClick={this.onIncrement.bind(this)}
        >
          Increment counter
        </button>
        <br />
        <button
          attr-test="decrement-button"
          onClick={this.onDecrement.bind(this)}
        >
          Decrement counter
        </button>
      </div>
    );
  }
}

export default App;
