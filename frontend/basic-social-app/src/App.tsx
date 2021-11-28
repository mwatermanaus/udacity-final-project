import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';
import { Link, BrowserRouter, Router, Switch, Route} from 'react-router-dom';
import { Grid, Menu, Segment } from 'semantic-ui-react';
import Header from './header/header';
import Footer from './footer/footer';
import Auth from './auth/Auth';
import { getSupportedCodeFixes } from 'typescript';

export interface AppProps {
  auth: Auth
  history: any
}

export interface AppState {}


export default class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props)

    this.handleLogin = this.handleLogin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogin() {
    this.props.auth.login()
  }

  handleLogout() {
    this.props.auth.logout() 
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Segment style={{ padding: '2em 0em'}} vertical>
          <Grid container stackable verticalAlign="middle">
            <Grid.Row>
              <Grid.Column width={16}>
              <Router history={this.props.history}>
                  {this.generateMenu()}
                </Router>
                <img src={logo} className="App-logo" alt="logo" />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Footer />
      </div>
    )
  }


  generateMenu() {
    return (
      <Menu>
        <Menu.Item name="home">
          <Link to="/">Home</Link>
        </Menu.Item>

        <Menu.Menu position="right">{this.logInLogOutButton()}</Menu.Menu>
      </Menu>
    )
  }


  logInLogOutButton() {
    if (this.props.auth.isAuthenticated()) {
      return (
        <Menu.Item name="logout" onClick={this.handleLogout}>
          Log Out
        </Menu.Item>
      )
    } else {
      return (
        <Menu.Item name="login" onClick={this.handleLogin}>
          Log In
        </Menu.Item>
      )
    }
  }




}

/*
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
      <Header/>
      <Router history={this.props.history}>
      <Switch>
        <Route path="/" exact component={App} />
      </Switch>
      <Footer/>
    </Router>
    </div>
  );
}

export default App;
*/