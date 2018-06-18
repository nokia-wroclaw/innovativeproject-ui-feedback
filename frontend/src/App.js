
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {ListExample} from './MUI/GridList.js';
import logo from './logo.svg';
import './App.css';
import Loginscreen from './Loginscreen'
injectTapEventPlugin();




class App extends Component {
  constructor(props){
      super(props);
      this.state={
        loginPage:[],
        uploadScreen:[]
      }
    }
  componentWillMount(){
    var loginPage =[];
    loginPage.push(<Loginscreen parentContext={this}/>);
    this.setState({
                  loginPage:loginPage
                    })
  }
   render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Feedback Control Panel</h1>
                </header>
                <p className="App-intro">

                </p>
                {this.state.loginPage}
                {this.state.uploadScreen}
            </div>
        );
    }
}
const style = {
  margin: 15,
};

export default App;
