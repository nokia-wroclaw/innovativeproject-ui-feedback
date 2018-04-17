
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {ListExample} from './MUI/GridList.js';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Hello World</h1>
        </header>
        <p className="App-intro">
          Wcisnij przycisk, którego nie ma :)
        </p>
        <p><MuiThemeProvider><ListExample/></MuiThemeProvider></p>
      </div>
    );
  }
}

export default App;
