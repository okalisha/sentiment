import React from 'react';
import { Form, Container, Button, Navbar, Card, InputGroup } from 'react-bootstrap';
import './Login.css'
import logo from '../../static/canada.png'
import axios from 'axios';

class Login extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
           
        }
    }

    login = () => {
        axios.post('http://localhost:8000/login', {
            username: this.state.username,
            password: this.state.password
        }, {headers: {"Access-Control-Allow-Origin": "*"}})
        .then((response) => {
            
            const info = {
                authenticated: response.data.authenticated,
                username: response.data.username,
                userType: response.data.userType,
                authToken: response.data.authToken
            }
            console.log(info)
            this.props.login(info)
        }, (error) => {
            console.log(error);
        });
    }

    handleUsernameChange = event =>  { 
       
        this.setState({
            username: event.target.value
        })
    }

    handlePasswordChange = event => { 
        this.setState({
            password: event.target.value
        })
    }

    render() {
        return (
            <div>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
                    <Navbar.Brand to="/home"><img alt="" src={logo} width="40" height="30" className="d-inline-block align-top"/>Reviews Insights</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav"></Navbar.Collapse>
                </Navbar> 
                <Container>
                    <div className="d-flex justify-content-center h-100">
                        <Card>
                            <Card.Header>
                                <h3>LogIn</h3>
                            </Card.Header>
                            <Card.Body>
                                <Form>
                                    <Form.Group controlId="formGroupUsername">
                                        <InputGroup className="mb-3">
                                            <InputGroup.Prepend >
                                                <InputGroup.Text />                                        
                                            </InputGroup.Prepend>
                                            <Form.Control type="text" placeholder="USERNAME" onChange={this.handleUsernameChange}/>  
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group controlId="formGroupPassword">
                                        <InputGroup className="mb-3">
                                            <InputGroup.Prepend >
                                                <InputGroup.Text />
                                            </InputGroup.Prepend>
                                            <Form.Control type="password" placeholder="PASSWORD" onChange={this.handlePasswordChange}/>  
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group>
                                        <Button className="btn btn-warning btn-block" onClick={this.login}>Log In</Button>
                                    </Form.Group>
                                </Form>
                            </Card.Body>
                            <Card.Footer>
                                <div className="d-flex justify-content-center links">
                                    Don't have an account?<a href="/signup" onClick={this.signup}>SignUp</a>
                                </div>
                                <div className="d-flex justify-content-center">
                                    <a href="/forget">Forgot your password?</a>
                                </div>
                            </Card.Footer>
                        </Card>
                    </div>
                </Container>
            </div>
        )
    }
}

export default Login;
