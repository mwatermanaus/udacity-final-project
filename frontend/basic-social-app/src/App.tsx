import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';
import { Router, Switch, Route} from 'react-router-dom';
import { Grid, Menu, Segment } from 'semantic-ui-react';
import { Header } from './header/header';
import { Footer } from './footer/footer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

      </header>
      <Button variant="contained" color="primary">
          Hello World!
      </Button>
      <Router history={this.props.history}>
      <Header/>
      <Switch>
        <Route path="/" exact component={App} />
      </Switch>
      <Footer/>
    </Router>
    </div>
  );
}

export default App;
