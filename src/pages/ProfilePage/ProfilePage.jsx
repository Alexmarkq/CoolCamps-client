import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/auth.context'
import { Card, ListGroup, Container, Button } from 'react-bootstrap'
import rentService from '../../services/Rent.service'
import { Link } from 'react-router-dom'
import RentList from '../../components/RentList/RentList'


const ProfilePage = () => {

    const [rents, setRents] = useState(null)

    const { user } = useContext(AuthContext)


    const loadProducts = () => {
        rentService
            .getOwnProducts()
            .then(({ data }) => { setRents(data) })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        loadProducts()
    }, [])

    const { username, email, profileImg, owner } = user

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
                        <ListGroup.Item></ListGroup.Item>
                    </ListGroup>


                </Card>
                <h1 className="mt-4">Mis alquileres</h1>
                <hr />
                {!rents ? <h2>Cargando</h2> : <RentList rents={rents} />}
                <hr />
                <Link to="/">
                    <Button variant="outline-secondary">Volver al inicio</Button>
                </Link>

            </Container >
        </>
    )
}

export default ProfilePage