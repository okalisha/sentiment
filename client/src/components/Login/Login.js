import React from 'react';
import { Form, Container, Button } from 'react-bootstrap';
import './Login.css'
import axios from 'axios';

class Login extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
           
        }
    }

    login = () => {
        axios.post('http://localhost:8001/login', {
            username: this.state.username,
            password: this.state.password
        }, {headers: {"Access-Control-Allow-Origin": "*"}})
        .then((response) => {
            console.log(response)
            const info = {
                authenticated: true,
                username: 'alisha',
                userType: 'customer',
                accessToken: 'abcdef'
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
            <Container>
                <div className="d-flex justify-content-center h-100">
                    <div className="card">
                        <div className="card-header">
                            <h3>Sign In</h3>
                            <div className="d-flex justify-content-end social_icon">
                                <span><i className="fab fa-facebook-square"></i></span>
                                <span><i className="fab fa-google-plus-square"></i></span>
                                <span><i className="fab fa-twitter-square"></i></span>
                            </div>
                        </div>
                        <div className="card-body">
                            <Form>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fas fa-user"></i></span>
                                    </div>
                                    <Form.Control type="text" placeholder="username" onChange={this.handleUsernameChange}/>
                                    
                                </div>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fas fa-key"></i></span>
                                    </div>
                                    <Form.Control type="password" placeholder="password" onChange={this.handlePasswordChange}/>
                                </div>
                                <div className="row align-items-center remember">
                                    {/* <input type="checkbox">Remember Me/</input> */}
                                </div>
                                <div className="form-group">
                                <Button className="btn btn-warning btn-block" onClick={this.login}>Login</Button>
                                </div>
                            </Form>
                        </div>
                        <div className="card-footer">
                            <div className="d-flex justify-content-center links">
                                Don't have an account?<a href="/signup">Sign Up</a>
                            </div>
                            <div className="d-flex justify-content-center">
                                <a href="/forget">Forgot your password?</a>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        )
    }
}

export default Login;
