import { Container, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import './HomePage.css'

const HomePage = () => {

    return (
        <div>
            <img src={"./../homebackground.jpeg"} className="homepage" />
            <Container className="Home">

                <Row>

                    <Col md={{ span: 8, offset: 2 }}>

                        <h1>🚐 Cool Camps</h1>
                        <hr />
                        <p>Lo tienes tio?</p>
                        <Link to="/lista">
                            <Button variant="outline-secondary">Ir a la galería</Button>
                        </Link>
                        <hr />

                    </Col>

                </Row>

            </Container>
        </div>

    )
}

export default HomePage