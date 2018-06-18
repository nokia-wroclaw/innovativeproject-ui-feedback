import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {ListExample} from './MUI/GridList.js';
import logo from './logo.svg';
import './App.css';


class UploadScreen extends Component {
   render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Feedback Control Panel</h1>
                </header>
                <p className="App-intro">

                </p>
                <div><ListExample/></div>
            </div>
        );
    }
}

export default UploadScreen;
