import React from 'react';
import { Form, Container, Button } from 'react-bootstrap';
import { Progress } from 'reactstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Home extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            inputText: null,
            prediction: null,
            selectedFile: null,
            uploadStatus: false,
            fileName: 'Upload File...',
            loaded: 0
        }
    }

    handleTextChange = event => {
        clearTimeout(this.timer);
        this.setState((state) => ({
            ...state, prediction: null
        }));
        this.setState((state) => ({
            ...state, inputText: event.target.value
        }))
        if (event.target.value.length > 10) {
            this.timer = setTimeout(this.callAPI, 500)
            this.callPredictionAPI()
        } 
    }

    handleFileChange = event => {
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

    callPredictionAPI = () => {
        axios.post('http://localhost:8000/predict', {
            items:[this.state.inputText]
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
            <Container className=''>
                <br/>
                <Form >
                    <Form.Control type="text" placeholder="Enter Text" className="mr-sm-2" onChange={this.handleTextChange}/>
                    <div>{this.state.prediction}</div>
                    <br/>
                    <br/>
                    <Form.File id="custom-file" label={this.state.fileName} custom onChange={this.handleFileChange}/>
                    <br/>
                    <br/>
                    <Button className="btn btn-info btn-block" onClick={this.uploadFile}>Upload</Button>
                    <Progress max="100" color="success" value={this.state.loaded} >{Math.round(this.state.loaded,2) }%</Progress>
                    <ToastContainer />
                </Form>
            </Container>
        )
    }
}

export default Home;
