import React from "react";

// react-bootstrap components
import {
  Button,
  Card,
  Form,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import Cookies from 'js-cookie';
import axios from 'axios';

class User extends React.Component {
  constructor(props) {
    super(props); 
    this.state = {
      "customer_id": Cookies.get('customer_id')
    }
  }

  componentDidMount() {
    axios.get(`http://localhost:8000/info/${this.state.customer_id}`, {headers: {"Access-Control-Allow-Origin": "*"}})
        .then((response) => {
            this.setState(response.data)
            console.log(this.state)
        }, (error) => {
            console.log(error);
        });
  }


  render () {
    return (
      <>
        <Container fluid>
          <Row>
            <Col md="8">
              <Card>
                <Card.Header>
                  <Card.Title as="h4">Edit Profile</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Form>
                    <Row>
                      <Col className="pr-1" md="5">
                        <Form.Group>
                          <label>Company (disabled)</label>
                          <Form.Control
                            defaultValue={this.state.company}
                            disabled
                            placeholder="Company"
                            type="text"
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                      <Col className="pl-1" md="7">
                        <Form.Group>
                          <label htmlFor="exampleInputEmail1">
                            Email Address
                          </label>
                          <Form.Control
                            placeholder="Email"
                            type="email"
                            defaultValue={this.state.email}
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-1" md="6">
                        <Form.Group>
                          <label>First Name</label>
                          <Form.Control
                            defaultValue={this.state.first_name}
                            placeholder="Company"
                            type="text"
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                      <Col className="pl-1" md="6">
                        <Form.Group>
                          <label>Last Name</label>
                          <Form.Control
                            defaultValue={this.state.last_name}
                            placeholder="Last Name"
                            type="text"
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <Form.Group>
                          <label>Contact</label>
                          <Form.Control
                            defaultValue={this.state.contact}
                            placeholder="Contact Number"
                            type="text"
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Button
                      className="btn-fill pull-right"
                      type="submit"
                      variant="info"
                    >
                      Update Profile
                    </Button>
                    <div className="clearfix"></div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
            <Col md="4">
              <Card className="card-user">
              <Card.Header>
                  <Card.Title as="h4">Change Password</Card.Title>
                </Card.Header>
                <Card.Body>
                <Form>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password*</Form.Label>
                    <Form.Control type="password" placeholder="" />
                  </Form.Group>
  
                  <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                    <Form.Label>Confirm Password*</Form.Label>
                    <Form.Control type="password" placeholder="" />
                  </Form.Group>
                  <Button className="btn-fill pull-right" variant="info" type="submit">
                    Submit
                  </Button>
                </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
  
}

export default User;
