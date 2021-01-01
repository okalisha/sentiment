import React from 'react';
import { Spinner, Container } from 'react-bootstrap';
import TableView from './TableView'

class Overview extends React.Component {
    render() {
        if (this.props.data.length > 0) {
            return (
                <TableView data = {this.props.data}/>
            )
        }  else {
            return (
                <Container fluid className="d-flex justify-content-center" style={{marginTop: "30vh"}}>
                    <Spinner style={{width:'150px', height:'150px'}} animation="border" />
                </Container>
            )
        }
    }
}

export default Overview;
