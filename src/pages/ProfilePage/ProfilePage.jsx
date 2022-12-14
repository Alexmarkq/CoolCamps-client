import './../ProfilePage/ProfilePage.css'
import RentList from '../../components/RentList/RentList'
import UserCard from '../../components/UserCard/UserCard'
import { Container, Button, Row, Col } from 'react-bootstrap'
import { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { RentContext } from '../../contexts/rent.context'
// import { AuthContext } from '../../contexts/auth.context'


function ProfilePage() {

    // const { user } = useContext(AuthContext)

    const { loadUserRents, userRents, favRents, getLikedRents, loadRents } = useContext(RentContext)

    useEffect(() => {
        loadRents()
        loadUserRents()
        getLikedRents()
    }, [])

    // const { username, email, profileImg } = user

    return (
        <>
            <Container>
                <Row className="mt-4">
                    <Col  >
                        <h3 >Mi perfil</h3>
                        <hr />
                        <UserCard />
                    </Col>
                    <Col  >
                        <h3 >Mis anuncios</h3>
                        <hr />
                        <RentList rents={userRents} />
                    </Col>
                </Row>

                <Row className='fav'>
                    {favRents.length === 0 ?
                        <>
                            <h3>No tienes favoritos</h3>
                            <hr />
                        </>
                        :
                        <>
                            <h3 >Favoritos</h3>
                            <hr />
                            < RentList rents={favRents} refreshRents={getLikedRents} />
                        </>
                    }
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