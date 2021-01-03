import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Usage from './components/Usage/Usage'
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import { Nav, Navbar } from 'react-bootstrap';
import './App.css'
import logo from './static/canada.png'
import Cookies from 'js-cookie';

class App extends React.Component {
  constructor(props) {
    super(props); 
    this.state = {
        authenticated: Cookies.get('authenticated') || false,
        username: Cookies.get('username') || null,
        userType: Cookies.get('userType') || null,
        accessToken: Cookies.get('accessToken') || null,
    }
  }

  login = (info) => {
    this.setState({
      authenticated: Cookies.set('authenticated', info.authenticated),
      username: Cookies.set('username', info.username),
      userType: Cookies.set('userType', info.userType),
      accessToken: Cookies.set('accessToken', info.accessToken)
    })
  }
  

  render(){
    if(!this.state.authenticated) {
      return (
        <div >
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
            <Navbar.Brand ><img alt="" src={logo} width="40" height="30" className="d-inline-block align-top"/>{' '}Sentiment</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav"></Navbar.Collapse>
          </Navbar> 
          <Login login={this.login}/>
        </div>
      )
        

    } else {
      return (
        <Router>
          <div style={{backgroundColor: `#f2f2f2`, minHeight:'100vh'}}>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
              <Navbar.Brand as={Link} to="/home"><img alt="" src={logo} width="40" height="30" className="d-inline-block align-top"/>{' '}Sentiment</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Item><Nav.Link eventKey="3" as={Link} to="/">Home</Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link eventKey="1" as={Link} to="/usage">Usage</Nav.Link></Nav.Item>
              </Nav>
              </Navbar.Collapse>
            </Navbar> 
            <Switch>
              <Route path="/usage"><Usage data={this.state.nocs}/></Route>
              <Route path="/"><Home data={this.state.draws}/></Route>
            </Switch>
          </div>
        </Router>
      );
    }
  }
}

export default App;