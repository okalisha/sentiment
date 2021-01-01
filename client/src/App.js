import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Usage from './components/Usage'
import Home from './components/Home'
import { Nav, Navbar } from 'react-bootstrap';
import './App.css'
import logo from './canada.png'

class App extends React.Component {
  constructor(props) {
    super(props); 
    this.state = {
        draws: [],
        nocs: [],
        overview: []
    }
  }

  // componentDidMount() {
  //   fetch("/api/draws?summary=1")
  //   .then(response => response.json())
  //   .then(data => this.setState({...this.state, draws: data}))

  //   fetch("/api/nocs/all")
  //   .then(response => response.json())
  //   .then(data => this.setState({...this.state, nocs: data}))

  //   fetch("/api/draws/overview")
  //   .then(response => response.json())
  //   .then(data => this.setState({...this.state, overview: data}))
  // }

  render(){
    return (
      <Router>
        <div style={{backgroundColor: `#f2f2f2`, minHeight:'100vh'}}>
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
            <Navbar.Brand as={Link} to="/home"><img
              alt=""
              src={logo}
              width="40"
              height="30"
              className="d-inline-block align-top"
            />{' '}Sentiment</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Item><Nav.Link eventKey="3" as={Link} to="/">Home</Nav.Link></Nav.Item>
              <Nav.Item><Nav.Link eventKey="1" as={Link} to="/usage">Usage</Nav.Link></Nav.Item>
            </Nav>
            </Navbar.Collapse>
          </Navbar> 
          <Switch>
            <Route path="/usage">< Usage data={this.state.nocs}/></Route>
            <Route path="/"><Home data={this.state.draws}/></Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;