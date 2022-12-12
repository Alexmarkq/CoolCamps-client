import { useContext, useEffect } from 'react'
import { AuthContext } from '../../contexts/auth.context'
import { Card, ListGroup, Container, Button, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import RentList from '../../components/RentList/RentList'
import { RentContext } from '../../contexts/rent.context'



const ProfilePage = () => {

    const { user } = useContext(AuthContext)

    const { loadUserRents, userRents, favRents, getLikedRents } = useContext(RentContext)

    useEffect(() => {
        loadUserRents()
        getLikedRents()
    }, [])

    const { username, email, profileImg } = user

    return (
        <>
            <Container>

                <Card className='mt-5' style={{ width: '25rem' }}>
                    <Card.Img variant="top" src={profileImg} />
                    <Card.Body>
                        <Card.Title>{username}</Card.Title>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item>{email}</ListGroup.Item>
                        {user &&
                            <ListGroup.Item>
                                <Link to="/">
                                    <Button variant="outline-danger">Eliminar Cuenta</Button>
                                </Link>
                            </ListGroup.Item>}
                    </ListGroup>

                </Card>
                <Row className="mt-4">
                    <Col  >
                        <h2 >Mis anuncios</h2>
                        <hr />
                        <RentList rents={userRents} />
                    </Col>

                    <Col >
                        {favRents.length === 0 ?
                            <>
                                <h2>No tienes favoritos</h2>
                                <hr />
                            </>
                            :
                            <>
                                {/* propietario: undefined */}
                                <h2 >Favoritos</h2>
                                <hr />
                                < RentList rents={favRents} refreshRents={getLikedRents} />
                            </>
                        }
                    </Col>
                </Row>

                <hr />
                <Link to="/lista">
                    <Button variant="outline-secondary">Volver</Button>
                </Link>

            </Container >
        </>
    )
}

export default ProfilePage