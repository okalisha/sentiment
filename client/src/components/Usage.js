import React from 'react';
import canada from '../canada.png'
import {Card, Container, CardDeck, Image} from 'react-bootstrap'
import bg from '../bg.jpg'

class Usage extends React.Component {
    getStats = (data) => {
        let invites=0;
        let maxScore=0;
        let minScore=0;
        let scoreArray = []

        for (let i=0; i<data.length; i++){
            invites+=parseInt(data[i].invitations)
            scoreArray.push(data[i].score)
        }

        scoreArray = scoreArray.sort()
        minScore = scoreArray[0]
        maxScore = scoreArray[scoreArray.length-1]

        return([invites.toString(), minScore.toString(), maxScore.toString()])
    }

    render() {

        let invites,minScore,maxScore = '';
        if (this.props.data.length>0){
            let stats = this.getStats(this.props.data);
            invites = stats[0]
            minScore = stats[1]
            maxScore = stats[2] 
        }
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
                                <h1>{invites}</h1>
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
                                <h1>{minScore}</h1>
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
                                <h1>{maxScore}</h1>
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
