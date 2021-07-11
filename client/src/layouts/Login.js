import React from 'react';
import { Form, Container, Button, Card, InputGroup } from 'react-bootstrap';
// import { Satellite } from '@material-ui/icons';

// import { FontAwesomeIcon } from '@fortawesome/fontawesome-free'
// import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import PersonIcon from "@material-ui/icons/Person";
import LockIcon from "@material-ui/icons/Lock";
import '../assets/css/Login.css'
import axios from 'axios';
import Cookies from 'js-cookie';



class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    callLoginAPI = () => {
        axios.post('http://localhost:8000/login', {
            username: this.state.username,
            password: this.state.password
        }, { headers: { "Access-Control-Allow-Origin": "*" } })
            .then((response) => {

                const info = {
                    authenticated: response.data.authenticated,
                    customer_id: response.data.customer_id,
                    username: response.data.username,
                    userType: response.data.userType,
                    authToken: response.data.authToken
                }

                this.props.login(info)

            }, (error) => {
                console.log(error);
            });
    }

    handleUsernameChange = event => {

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

            <div className="Loginpage">
                <h5 className="loginlogo">Welcome To Reviews Insights</h5>
             
                <Container className="logincontainer" >
                    <div className="d-flex justify-content-center h-100">
                        <Card className="logincard">
                            <h3 className="loginheading">SignIn</h3>
                            <Card.Body>
                                <Form>
                                    <Form.Group controlId="formGroupUsername">
                                        <InputGroup className="mb-3">
                                            <InputGroup.Prepend >                                   
                                            <InputGroup.Text >
                                            {<PersonIcon/>}
                                            </InputGroup.Text>                                                                     
                                            </InputGroup.Prepend>
                                            <Form.Control type="text" placeholder="USERNAME" onChange={this.handleUsernameChange} />
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group controlId="formGroupPassword">
                                        <InputGroup className="mb-3">
                                            <InputGroup.Prepend >
                                            <InputGroup.Text >
                                            {<LockIcon/>}
                                            </InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <Form.Control type="password" placeholder="PASSWORD" onChange={this.handlePasswordChange} />
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group>
                                        <Button className="btn btn-info btn-block" onClick={this.callLoginAPI}>Log In</Button>
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