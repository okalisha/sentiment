import React from 'react';
import { Form, Container, Button, Navbar, Card, InputGroup } from 'react-bootstrap';
import './Signup.css'
import logo from '../../static/canada.png'
import axios from 'axios';

class SignUp extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
           
        }
    }

    signup = () => {
        axios.post('http://localhost:8000/signup', {
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
    handleOrganizationNameChange = event => { 
        this.setState({
            organizationname: event.target.value
        })
    }
    handleEmailChange = event => { 
        this.setState({
            email: event.target.value
        })
    }

    handlePasswordChange = event => { 
        this.setState({
            password: event.target.value
        })
    }
    handleConfirmPasswordChange = event => { 
        this.setState({
            confirmpassword: event.target.value
        })
    }

    render() {
        return (
            <div>
                <Container>
                    <div className="d-flex justify-content-center h-100">
                        <Card>
                            <Card.Header>
                                <h3>Sign Up</h3>
                            </Card.Header>
                            <Card.Body>
                                <Form>
                                    <Form.Group controlId="formGroupUsername">
                                        <InputGroup className="mb-3">
                                            <InputGroup.Prepend >
                                                <InputGroup.Text />                                        
                                            </InputGroup.Prepend>
                                            <Form.Control type="text" placeholder="Name" onChange={this.handleUsernameChange}/>  
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group controlId="formGroupOrganizationName">
                                        <InputGroup className="mb-3">
                                            <InputGroup.Prepend >
                                                <InputGroup.Text />
                                            </InputGroup.Prepend>
                                            <Form.Control type="text" placeholder="Organization Name" onChange={this.handleOrganizationNameChange}/>
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group controlId="formGroupEmail">
                                        <InputGroup className="mb-3">
                                            <InputGroup.Prepend >
                                                <InputGroup.Text />
                                            </InputGroup.Prepend>
                                            <Form.Control type="text" placeholder="Email" onChange={this.handleEmailChange}/>
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group controlId="formGroupPassword">
                                        <InputGroup className="mb-3">
                                            <InputGroup.Prepend >
                                                <InputGroup.Text />
                                            </InputGroup.Prepend>
                                            <Form.Control type="text" placeholder="Password" onChange={this.handlePasswordChange}/>
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group controlId="formGroupConfirmPassword">
                                        <InputGroup className="mb-3">
                                            <InputGroup.Prepend >
                                                <InputGroup.Text />
                                            </InputGroup.Prepend>
                                            <Form.Control type="text" placeholder="Confirm Password" onChange={this.handleConfirmPasswordChange}/>
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group>
                                        <Button className="btn btn-warning btn-block" onClick={this.signup}>SignUp</Button>
                                    </Form.Group>
                                </Form>
                            </Card.Body>
                                        
                        </Card>
                    </div>
                </Container>
            </div>
        )
    }
}

export default SignUp;
