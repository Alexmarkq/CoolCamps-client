import { useContext, useEffect } from 'react'
import { AuthContext } from '../../contexts/auth.context'
import { Card, ListGroup, Container, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import RentList from '../../components/RentList/RentList'
import { RentContext } from '../../contexts/rent.context'


const ProfilePage = () => {

    const { user } = useContext(AuthContext)

    const { loadUserRents, userRents } = useContext(RentContext)

    useEffect(() => {
        loadUserRents()
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
                <h1 className="mt-4">Mis anuncios</h1>
                <hr />
                <RentList rents={userRents} />
                <hr />
                <Link to="/">
                    <Button variant="outline-secondary">Volver al inicio</Button>
                </Link>

            </Container >
        </>
    )
}

export default ProfilePage