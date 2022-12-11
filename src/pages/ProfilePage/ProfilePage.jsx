import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/auth.context'
import { Card, ListGroup, Container, Button, Col } from 'react-bootstrap'
import rentService from '../../services/Rent.service'
import { Link } from 'react-router-dom'
import RentList from '../../components/RentList/RentList'
import { RentContext } from '../../contexts/rent.context'
import Loader from '../../components/Loader/Loader'




const ProfilePage = () => {

    const { user } = useContext(AuthContext)

    const { loadUserRents, userRents } = useContext(RentContext)

    const [favRents, setFavRents] = useState(null)

    const getLikedRents = () => {

        rentService
            .getLikedRent()
            .then(({ data }) => setFavRents(data))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        loadUserRents()
        getLikedRents()
    }, [])

    const { username, email, profileImg, owner, _id } = user

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
                {/* {favRents ?

                    <h1> No tienes favoritos</h1>

                    : */}
                <>
                    <h1>Me interesa</h1>
                    {!favRents ? <Loader /> : <RentList rents={favRents} refreshRents={getLikedRents} />}
                </>
                {/* } */}

                <hr />
                <Link to="/">
                    <Button variant="outline-secondary">Volver al inicio</Button>
                </Link>

            </Container >
        </>
    )
}

export default ProfilePage