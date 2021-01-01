import React from 'react';
import {Table} from 'react-bootstrap'

class TableView extends React.Component {
    render() {
        if (typeof this.props.data != 'undefined'){
            return (
                <Table responsive striped bordered hover size="sm">
                    <thead className='thead-dark'>
                        <tr>
                            { Object.keys(this.props.data[0]).map((colName, index) => { return <th style={{fontSize: '12px', position: 'sticky'}} key={index}>{colName.replace('_', ' ').toUpperCase()}</th>})}
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.data.map((row, index)=> {
                            let rowClass = ''
                            switch(row.total) {
                                case 11:
                                    rowClass = 'table-danger'
                                    break;
                                case 10:
                                    rowClass = 'table-warning'
                                    break;
                                case 9:
                                    rowClass = 'table-info'
                                    break;
                                case 8:
                                    rowClass = 'table-info'
                                    break;
                                case 6:
                                    rowClass = 'table-success'
                                    break;
                                default:
                                    rowClass = ''
                            }
                            
                            return (
                                <tr style={{fontSize: '12px'}} key={index} className={rowClass}>
                                    { Object.entries(row).map((vals, idx) => {
                                            let cellClass = ''
                                            if (vals[0] === 'noc_id') {
                                                // vals[1] = <a href = {`https://www120.statcan.gc.ca/stcsr/en/cm1/cls?fq=ds%3a102noc2016&start=0&showsum=show&q=${vals[1]}`} target={'_blank'}>{vals[1]}</a> 
                                            } 
                                            if (vals[0] === 'total') {
                                                vals[1] = <b>{vals[1]}</b>
                                                cellClass = 'bg-warning' 
                                            }
                                            if (vals[1] === 'Yes') {
                                                cellClass = 'bg-success' 
                                            }
                                            if (vals[1] === 'No') {
                                                cellClass = 'bg-danger' 
                                            }
                                            return (
                                                <td className={cellClass} key={idx}>{vals[1]}</td>
                                            )
                                        })
                                    }
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>       
            )
        }

        return(
            <p/>
        )
    }
}

export default TableView;