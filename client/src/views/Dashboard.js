import React from "react";
import ChartistGraph from "react-chartist";
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";

class Dashboard extends React.Component {

  render () {
    return (
      <>
        <Container fluid>
          <Row>
            {/* <Col lg="3" sm="6">
              <Card className="card-stats">
                <Card.Body>
                  <Row>
                    <Col xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-chart text-warning"></i>
                      </div>
                    </Col>
                    <Col xs="7">
                      <div className="numbers">
                        <p className="card-category">Number</p>
                        <Card.Title as="h4">150GB</Card.Title>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
                <Card.Footer>
                  <hr></hr>
                  <div className="stats">
                    <i className="fas fa-redo mr-1"></i>
                    Update Now
                  </div>
                </Card.Footer>
              </Card>
            </Col> */}
            <Col lg="4" sm="6">
              <Card className="card-stats">
                <Card.Body>
                  <Row>
                    <Col xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-cloud-upload-94 text-success"></i>
                      </div>
                    </Col>
                    <Col xs="7">
                      <div className="numbers">
                        <p className="card-category">Reviews Processed</p>
                        <Card.Title as="h4">15,000</Card.Title>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
                <Card.Footer>
                  <hr></hr>
                  <div className="stats">
                    <i className="far fa-calendar-alt mr-1"></i>
                    Since June 10, 2015
                  </div>
                </Card.Footer>
              </Card>
            </Col>
            <Col lg="4" sm="6">
              <Card className="card-stats">
                <Card.Body>
                  <Row>
                    <Col xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-simple-add text-info"></i>
                      </div>
                    </Col>
                    <Col xs="7">
                      <div className="numbers">
                        <p className="card-category">Positive Reviews</p>
                        <Card.Title as="h4">9,500</Card.Title>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
                <Card.Footer>
                  <hr></hr>
                  <div className="stats">
                    <i className="far fa-calendar-alt mr-1"></i>
                    Since June 10, 2015
                  </div>
                </Card.Footer>
              </Card>
            </Col>
            <Col lg="4" sm="6">
              <Card className="card-stats">
                <Card.Body>
                  <Row>
                    <Col xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-simple-remove text-danger"></i>
                      </div>
                    </Col>
                    <Col xs="7">
                      <div className="numbers">
                        <p className="card-category">Negative Reviews</p>
                        <Card.Title as="h4">5,500</Card.Title>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
                <Card.Footer>
                  <hr></hr>
                  <div className="stats">
                    <i className="far fa-calendar-alt mr-1"></i>
                    Since June 10, 2015
                  </div>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
          <Row>
          <Col md="8">
              <Card>
                <Card.Header>
                  <Card.Title as="h4">2020 Sentiment</Card.Title>
                  <p className="card-category">All Products</p>
                </Card.Header>
                <Card.Body>
                  <div className="ct-chart" id="chartActivity">
                    <ChartistGraph
                      data={{
                        labels: [
                          "Jan",
                          "Feb",
                          "Mar",
                          "Apr",
                          "May",
                          "Jun",
                          "Jul",
                          "Aug",
                          "Sep",
                          "Oct",
                          "Nov",
                          "Dec",
                        ],
                        series: [
                          [
                            542,
                            443,
                            320,
                            780,
                            553,
                            453,
                            326,
                            434,
                            568,
                            610,
                            756,
                            895,
                          ],
                          [
                            412,
                            243,
                            280,
                            580,
                            453,
                            353,
                            300,
                            364,
                            368,
                            410,
                            636,
                            695,
                          ],
                        ],
                      }}
                      type="Bar"
                      options={{
                        seriesBarDistance: 10,
                        axisX: {
                          showGrid: false,
                        },
                        height: "245px",
                      }}
                      responsiveOptions={[
                        [
                          "screen and (max-width: 640px)",
                          {
                            seriesBarDistance: 5,
                            axisX: {
                              labelInterpolationFnc: function (value) {
                                return value[0];
                              },
                            },
                          },
                        ],
                      ]}
                    />
                  </div>
                </Card.Body>
                <Card.Footer>
                  <div className="legend">
                    <i className="fas fa-square text-info"></i> Positive 
                    &nbsp;
                    <i className="fas fa-square text-danger"></i> Negative
                  </div>
                  <hr></hr>
                  <div className="stats">
                    <i className="fas fa-check"></i>
                    Data information certified
                  </div>
                </Card.Footer>
              </Card>
            </Col>
            <Col md="4">
              <Card>
                <Card.Header>
                  <Card.Title as="h4">Overall Sentiment</Card.Title>
                  {/* <p className="card-category">Last Campaign Performance</p> */}
                </Card.Header>
                <Card.Body>
                  <div
                    className="ct-chart ct-perfect-fourth"
                    id="chartPreferences"
                  >
                    <ChartistGraph
                      data={{
                        labels: ["65%", "35%"],
                        series: [65, 35]
                      }}
                      type="Pie"
                      options={{
                        donut: true,
                      }}
                    />
                  </div>
                  <center>
                  <div className="legend">
                    <i className="fas fa-square text-info"></i> Positive
                    &nbsp;
                    <i className="fas fa-square text-danger"></i> Negative
                  </div>
                  </center>
                </Card.Body>
                <Card.Footer>
                  <hr></hr>
                  <div className="stats">
                    <i className="far fa-calendar-alt mr-1"></i>
                    Since June 10, 2015
                  </div>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <Card>
                <Card.Header>
                  <Card.Title as="h4">Reviews Processed</Card.Title>
                  <p className="card-category">Monthly</p>
                </Card.Header>
                <Card.Body>
                  <div className="ct-chart" id="chartHours">
                    <ChartistGraph
                      data={{
                        labels: [
                          "Jan",
                          "Feb",
                          "Mar",
                          "Apr",
                          "May",
                          "Jun",
                          "Jul",
                          "Aug",
                          "Sep",
                          "Oct",
                          "Nov",
                          "Dec",
                        ],
                        series: [
                          [],
                          [],
                          [500, 300, 200, 850, 770, 220, 150, 670, 150, 300, 79, 550],
                        ],
                      }}
                      type="Line"
                      options={{
                        low: 0,
                        high: 1000,
                        showArea: false,
                        height: "245px",
                        axisX: {
                          showGrid: false,
                        },
                        lineSmooth: true,
                        showLine: true,
                        showPoint: true,
                        fullWidth: false,
                        chartPadding: {
                          right: 50,
                        },
                      }}
                      responsiveOptions={[
                        [
                          "screen and (max-width: 640px)",
                          {
                            axisX: {
                              labelInterpolationFnc: function (value) {
                                return value[0];
                              },
                            },
                          },
                        ],
                      ]}
                    />
                  </div>
                  <div className="legend">
                    {/* <i className="fas fa-square text-info"></i>Open
                    <i className="fas fa-square text-danger"></i>Click  */}
                    <i className="fas fa-square text-warning"></i> Reviews Count
                  </div>
                </Card.Body>
                <Card.Footer>
                  <hr></hr>
                  <div className="stats">
                    <i className="fas fa-history"></i>
                    Updated 3 minutes ago
                  </div>
                </Card.Footer>
              </Card>
            </Col> 
          </Row>
          <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Recent Requests</Card.Title>
                {/* <p className="card-category">
                  Here is a subtitle for this table
                </p> */}
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">Time</th>
                      <th className="border-0">Reviews</th>
                      <th className="border-0">Positive</th>
                      <th className="border-0">Negative</th>
                      <th className="border-0">Request Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>5</td>
                      <td>2021-06-09 12:30</td>
                      <td>52</td>
                      <td>35</td>
                      <td>17</td>
                      <td>API</td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>2021-06-07 11:35</td>
                      <td>170</td>
                      <td>40</td>
                      <td>130</td>
                      <td>API</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>2021-06-05 14:57</td>
                      <td>200</td>
                      <td>88</td>
                      <td>112</td>
                      <td>API</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>2021-05-31 10:26</td>
                      <td>97</td>
                      <td>84</td>
                      <td>13</td>
                      <td>API</td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>2021-04-31 12:30</td>
                      <td>88</td>
                      <td>34</td>
                      <td>54</td>
                      <td>API</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col> 
          </Row>
        </Container>
      </>
    );

  }
  
}

export default Dashboard;
