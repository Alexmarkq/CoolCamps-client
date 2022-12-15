import { Container, Row, Col, Button, Carousel } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import './HomePage.css'

const linkStyle = {
    margin: "2rem",
    textDecoration: "none",
    color: 'white'

};

const HomePage = () => {

    return (
        <div className='back'>

            <div>
                <Container className="home">
                    <Carousel fade>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="https://res.cloudinary.com/dsqconqsu/image/upload/v1671102561/zqn4avtqsx15i0gzc0nm.jpg"
                                alt="First slide"
                            />
                            <Carousel.Caption>
                                <h3>First slide label</h3>
                                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="https://res.cloudinary.com/dsqconqsu/image/upload/v1671102781/uf7apmzbtddv7rcnlrsf.jpg"
                                alt="Second slide"
                            />

                            <Carousel.Caption>
                                <h3>Second slide label</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </Carousel.Caption>
                        </Carousel.Item>

                    </Carousel>
                    <Row>

                        {/* <Col lg={{ span: 10, offset: -1 }}>
                            <Link to="/lista" style={linkStyle}>
                                <h1 className='hero'>Explora</h1>
                            </Link>
                        </Col> */}

                    </Row>

                </Container>
            </div>

        </div>

    )
}

export default HomePage