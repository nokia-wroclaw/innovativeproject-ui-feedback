
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
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Feedback Control Panel</h1>
                </header>
                <p className="App-intro">

                </p>
                <p><MuiThemeProvider><ListExample/></MuiThemeProvider></p>
            </div>
        );
    }
}

export default App;
