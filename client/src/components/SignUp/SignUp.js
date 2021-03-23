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
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            comapany: this.state.company,
            email: this.state.email,
            phone: this.state.phone,
            password: this.state.password
        }, {headers: {"Access-Control-Allow-Origin": "*"}})
        .then((response) => {
            
            
            alert(response)
          
        }, (error) => {
            console.log(this.state);
        });
    }

    handleFirstNameChange = event =>  { 
       
        this.setState({
            first_name: event.target.value
        })
    }
    handleLastNameChange = event =>  { 
       
        this.setState({
            last_name: event.target.value
        })
    }
    handleOrganizationNameChange = event => { 
        this.setState({
            company: event.target.value
        })
    }
    handlePhoneNumberChange = event => { 
        this.setState({
            phone: event.target.value
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
                                    <Form.Group controlId="formGroupFirstname">
                                        <InputGroup className="mb-3">
                                            <InputGroup.Prepend >
                                                <InputGroup.Text />                                        
                                            </InputGroup.Prepend>
                                            <Form.Control type="text" placeholder="First Name" onChange={this.handleFirstNameChange}/>  
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group controlId="formGroupLastname">
                                        <InputGroup className="mb-3">
                                            <InputGroup.Prepend >
                                                <InputGroup.Text />                                        
                                            </InputGroup.Prepend>
                                            <Form.Control type="text" placeholder="Last Name" onChange={this.handleLastNameChange}/>  
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
                                    <Form.Group controlId="formGroupPhone">
                                        <InputGroup className="mb-3">
                                            <InputGroup.Prepend >
                                                <InputGroup.Text />                                        
                                            </InputGroup.Prepend>
                                            <Form.Control type="text" placeholder="Phone Number" onChange={this.handlePhoneNumberChange}/>  
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
