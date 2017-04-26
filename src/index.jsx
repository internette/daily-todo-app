import React from "react";
import ReactDOM from "react-dom";
require('./index.scss');

class App extends React.Component {
  render() {
    return (
      <div id="container">
        <h1>Daily To-Do</h1>
      </div>
    )
  }
}

const app = document.getElementById('app')

ReactDOM.render(<App/>, app);