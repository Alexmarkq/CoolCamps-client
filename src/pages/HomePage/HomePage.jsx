import { Container, Row, Col, Button } from 'react-bootstrap'
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

                    <Row>

                        <Col lg={{ span: 10, offset: -1 }}>
                            <Link to="/lista" style={linkStyle}>
                                <h1 className='hero'>Explora</h1>
                            </Link>
                        </Col>

                    </Row>

                </Container>
            </div>

        </div>

    )
}

export default HomePage