import React from 'react';
import { Spinner } from 'react-bootstrap';
import TableView from './TableView'

class Draws extends React.Component {
    render() {
        if (this.props.data.length > 0) {
        return (
            <TableView data = {this.props.data}/>
        )} else {
            return <Spinner animation="border" />
        }
    }
}

export default Draws;
