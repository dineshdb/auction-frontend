import React, {Component} from 'react';
import './App.css';
import NavigationBar from './components/appBar';
// import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';

/*
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Button variant="raised" color="primary">
          Hello World
        </Button>
      </div>
    );
  }
}
*/
class App extends Component {
    render() {
        return (
            <NavigationBar/>
        )
    }
}

export default App;
