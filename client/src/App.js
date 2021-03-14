import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Usage from './components/Usage/Usage'
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import SignUp from './components/SignUp/SignUp'
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
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

    Cookies.set('authenticated', info.authenticated);
    Cookies.set('username', info.username);
    Cookies.set('userType', info.userType);
    Cookies.set('authToken', info.authToken);

    this.setState({
      authenticated: info.authenticated,
      username: info.username,
      userType: info.userType,
      authToken: info.authToken
    })
  }

  signup = (info) => {

  }

  logout = () => {
    Cookies.remove('username')
    Cookies.remove('authenticated')
    Cookies.remove('userType')
    Cookies.remove('authToken')

    this.setState({
        authenticated: false,
        username: null,
        userType: null,
        authToken: null,
    })
  }


  render(){
    if(!this.state.authenticated) {
      return (
        <div >
          <Login login={this.login}/>
        </div>
      )
    } else {
      return (
        <Router>
          <div style={{backgroundColor: `#f2f2f2`, minHeight:'100vh'}}>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
              <Navbar.Brand as={Link} to="/home"><img alt="" src={logo} width="40" height="30" className="d-inline-block align-top"/>Reviews Insights</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Item><Nav.Link eventKey="3" as={Link} to="/">Home</Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link eventKey="1" as={Link} to="/usage">Usage</Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link eventKey="2" as={Link} to="/signup">SignUp</Nav.Link></Nav.Item>
                
              </Nav>
              <Nav>
                <NavDropdown title={this.state.username} id="collasible-nav-dropdown">
                  <NavDropdown.Divider />
                  <NavDropdown.Item eventKey="4" as={Link} to="/login" onClick={this.logout}>Logout</NavDropdown.Item>
                </NavDropdown>
              </Nav>
              </Navbar.Collapse>
            </Navbar> 
            <Switch>
              <Route path="/usage"><Usage /></Route>
              <Route path="/signup"><SignUp /></Route>
              <Route path="/"><Home /></Route>
              
              
            </Switch>
          </div>
        </Router>
      );
    }
  }
}

export default App;