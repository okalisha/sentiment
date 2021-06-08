// import React from "react";

// // react-bootstrap components
// import {
//   Badge,
//   Button,
//   Card,
//   Navbar,
//   Nav,
//   Container,
//   Row,
//   Col,
// } from "react-bootstrap";

// function Sentiment() {
//   return (
//     <>
//       <Container fluid>
//         <Row>
//           <Col md="12">
//             <Card>
//               <Card.Header>
//                 <Card.Title as="h4">Light Bootstrap Table Heading</Card.Title>
//                 <p className="card-category">
//                   Created using Montserrat Font Family
//                 </p>
//               </Card.Header>
//               <Card.Body>
//                 <div className="typography-line">
//                   <h1>
//                     <span>Header 1</span>
//                     The Life of Light Bootstrap Dashboard React
//                   </h1>
//                 </div>
//                 <div className="typography-line">
//                   <h2>
//                     <span>Header 2</span>
//                     The Life of Light Bootstrap Dashboard React
//                   </h2>
//                 </div>
//                 <div className="typography-line">
//                   <h3>
//                     <span>Header 3</span>
//                     The Life of Light Bootstrap Dashboard React
//                   </h3>
//                 </div>
//                 <div className="typography-line">
//                   <h4>
//                     <span>Header 4</span>
//                     The Life of Light Bootstrap Dashboard React
//                   </h4>
//                 </div>
//                 <div className="typography-line">
//                   <h5>
//                     <span>Header 5</span>
//                     The Life of Light Bootstrap Dashboard React
//                   </h5>
//                 </div>
//                 <div className="typography-line">
//                   <h6>
//                     <span>Header 6</span>
//                     The Life of Light Bootstrap Dashboard React
//                   </h6>
//                 </div>
//                 <div className="typography-line">
//                   <p>
//                     <span>Paragraph</span>I will be the leader of a company that
//                     ends up being worth billions of dollars, because I got the
//                     answers. I understand culture. I am the nucleus. I think
//                     that’s a responsibility that I have, to push possibilities,
//                     to show people, this is the level that things could be at.
//                   </p>
//                 </div>
//                 <div className="typography-line">
//                   <span>Quote</span>
//                   <blockquote>
//                     <p className="blockquote blockquote-primary">
//                       "I will be the leader of a company that ends up being
//                       worth billions of dollars, because I got the answers. I
//                       understand culture. I am the nucleus. I think that’s a
//                       responsibility that I have, to push possibilities, to show
//                       people, this is the level that things could be at."{" "}
//                       <br></br>
//                       <br></br>
//                       <small>- Noaa</small>
//                     </p>
//                   </blockquote>
//                 </div>
//                 <div className="typography-line">
//                   <span>Muted Text</span>
//                   <p className="text-muted">
//                     I will be the leader of a company that ends up being worth
//                     billions of dollars, because I got the answers...
//                   </p>
//                 </div>
//                 <div className="typography-line">
//                   <span>Primary Text</span>
//                   <p className="text-primary">
//                     I will be the leader of a company that ends up being worth
//                     billions of dollars, because I got the answers...
//                   </p>
//                 </div>
//                 <div className="typography-line">
//                   <span>Info Text</span>
//                   <p className="text-info">
//                     I will be the leader of a company that ends up being worth
//                     billions of dollars, because I got the answers...
//                   </p>
//                 </div>
//                 <div className="typography-line">
//                   <span>Success Text</span>
//                   <p className="text-success">
//                     I will be the leader of a company that ends up being worth
//                     billions of dollars, because I got the answers...
//                   </p>
//                 </div>
//                 <div className="typography-line">
//                   <span>Warning Text</span>
//                   <p className="text-warning">
//                     I will be the leader of a company that ends up being worth
//                     billions of dollars, because I got the answers...
//                   </p>
//                 </div>
//                 <div className="typography-line">
//                   <span>Danger Text</span>
//                   <p className="text-danger">
//                     I will be the leader of a company that ends up being worth
//                     billions of dollars, because I got the answers...
//                   </p>
//                 </div>
//                 <div className="typography-line">
//                   <h2>
//                     <span>Small Tag</span>
//                     Header with small subtitle <br></br>
//                     <small>Use "small" tag for the headers</small>
//                   </h2>
//                 </div>
//               </Card.Body>
//             </Card>
//           </Col>
//         </Row>
//       </Container>
//     </>
//   );
// }

// export default Sentiment;


import React from 'react';
import { Form, Container, Button, Row, Col } from 'react-bootstrap';
import { Progress } from 'reactstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';

class Sentiment extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            inputText: null,
            prediction: "Your prediction will show here!",
            selectedFile: null,
            uploadStatus: false,
            fileName: 'Upload File...',
            loaded: 0,
            email: null
        }
    }

    handleTextChange = event => {

        this.setState((state) => ({
            ...state, prediction: null
        }));
        this.setState((state) => ({
            ...state, inputText: event.target.value
        }))
        
    }

    handleFileChange = event => {
        if (event.target.files[0].type !== "text/csv") {
            toast.error('Only CSV files are allowed.');
            return
        }
        if (event.target.files[0].size > 26214400) {
            toast.error('File is too large. Acceptable size is 25 MB');
            return
        }
        this.setState({
            selectedFile: event.target.files[0],
            fileName: event.target.files[0].name,
            loaded: 0,
            uploadStatus: false
        })
    }

    handleEmailChange = event => {
        this.setState({
            email: event.target.value
        })
    }

    callPredictionAPI = () => {
        axios.post('http://localhost:8001/predict', {
            items:[this.state.inputText],
            customer_id: Cookies.get('customer_id')
        }, {headers: {"Access-Control-Allow-Origin": "*"}})
        .then((response) => {
            this.setState((state) => ({
                ...state, prediction: response.data.predictions[0].prediction
            }));
        }, (error) => {
            console.log(error);
        });
    }

    uploadFile = () => {
        if (this.state.selectedFile == null) {
            toast.error('Choose a file to upload!');
            return
        }

        if (this.state.uploadStatus) {
            toast.warning('File already uploaded!');
            return
        }  

        const data = new FormData() 
        data.append('file', this.state.selectedFile)
        data.append('email', this.state.email)
        axios.post("http://localhost:8000/upload", data, {
            onUploadProgress: ProgressEvent => {
                this.setState((state) => ({
                    ...state, 
                    loaded: (ProgressEvent.loaded / ProgressEvent.total*100),
                    uploadStatus: true 
                }));
            }
        })
        .then(res => { 
            toast.success('upload success');
        })
        .catch(err => { 
            toast.error('upload fail')
        })
    }

    render() {
        return (
            <Container>
                    <Row>
                        <Col></Col>
                        <Col xs={8}>
                            <Form >
                                <br />
                                <hr/>
                                <br />
                                <Form.Control type="text" placeholder="Enter Text" className="mr-sm-2" onChange={this.handleTextChange}/>
                                <Button className="btn btn-warning btn-block" onClick={this.callPredictionAPI}>Send</Button>
                                <div>{this.state.prediction}</div>
                                <br/>
                                <hr/>
                                <br/>
                                <Form.Control type="email" placeholder="email@example.com" className="mr-sm-2" onChange={this.handleEmailChange}/>
                                <Form.File id="custom-file" label={this.state.fileName} custom onChange={this.handleFileChange}/>
                                <br/>
                                <br/>
                                <Button className="btn btn-warning btn-block" onClick={this.uploadFile}>Upload</Button>
                                <Progress max="100" color="success" value={this.state.loaded} >{Math.round(this.state.loaded,2) }%</Progress>
                                <ToastContainer />
                            </Form>
                        </Col>
                        <Col></Col>
                    </Row>                
            </Container>
        )
    }
}

export default Sentiment;
