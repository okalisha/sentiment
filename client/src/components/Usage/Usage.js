import React from 'react';
import canada from '../../static/canada.png'
import {Card, Container, CardDeck, Image} from 'react-bootstrap'
import bg from '../../static/bg.jpg'

class Usage extends React.Component {
    render() {

        // const bg1 = 'https://venngage-wordpress.s3.amazonaws.com/uploads/2018/09/Orange-Pattern-Simple-Background-Image.jpg'
        return (
            <div>
                <div style={{backgroundImage: `url(${bg})`}}>
                    <Container className='text-center'>
                        <Image src={canada} fluid/>
                    </Container>
                </div>    
                <Container className='text-center'>
                <CardDeck style={{paddingTop: '5vh'}}>
                <Card border="info" className='text-center'>
                    <Card.Header><h3><b>Total Invites</b></h3></Card.Header>
                        <Card.Body>
                            <Card.Text>
                                <h1>123</h1>
                            </Card.Text>
                        </Card.Body>
                    <Card.Footer>
                    <small className="text-muted">Last Updated: Today</small>
                    </Card.Footer>
                </Card>
                <Card border="info" className='text-center'>
                    <Card.Header><h3><b>Minimum Score</b></h3></Card.Header>
                        <Card.Body>
                            <Card.Text>
                                <h1>345</h1>
                            </Card.Text>
                        </Card.Body>
                    <Card.Footer>
                    <small className="text-muted">Last Updated: Today</small>
                    </Card.Footer>
                </Card>
                <Card border="info" className='text-center'>
                    <Card.Header><h3><b>Maximum Score</b></h3></Card.Header>
                        <Card.Body>
                            <Card.Text>
                                <h1>444</h1>
                            </Card.Text>
                        </Card.Body>
                    <Card.Footer>
                    <small className="text-muted">Last Updated: Today</small>
                    </Card.Footer>
                </Card>
                </CardDeck>
                </Container>
            </div>
        );
    }
}

export default Usage;
