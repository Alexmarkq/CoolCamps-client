import RentList from '../../components/RentList/RentList'
import UserCard from '../../components/UserCard/UserCard'
import { Container, Button, Row, Col } from 'react-bootstrap'
import { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { RentContext } from '../../contexts/rent.context'
import { AuthContext } from '../../contexts/auth.context'


function ProfilePage() {

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

                <UserCard user={user} />

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