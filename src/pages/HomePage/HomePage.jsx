import { Container, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import './HomePage.css'

const HomePage = () => {

    return (
        <div>
            <img src={"./../homebackground.jpeg"} className="homepage" />
            <Container className="home">

                <Row>

                    <Col md={{ span: 8, offset: 2 }}>


                        <Link to="/lista">
                            <Button className="mt-5" variant="light">Ir a la galería</Button>
                        </Link>


                    </Col>

                </Row>

            </Container>
        </div>

    )
}

export default HomePage