import RentList from '../../components/RentList/RentList'
import UserCard from '../../components/UserCard/UserCard'
import { Container, Button, Row, Col } from 'react-bootstrap'
import { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { RentContext } from '../../contexts/rent.context'

function ProfilePage() {
  const { loadOwnRents, ownRents, favRents, getLikedRents, loadRents } =
    useContext(RentContext)

  const refreshAll = () => {
    loadRents()
    loadOwnRents()
    getLikedRents()
  }

  useEffect(() => {
    refreshAll()
  }, [])

  return (
    <>
      <Container>
        <Row className='mt-4'>
          <Col className='col-xxl-3 col-xl-3 col-lg-6 col-md-6'>
            <h3>Mi perfil</h3>
            <hr />
            <UserCard />
          </Col>
        </Row>
        <Row className='mt-4'>
          <Col>
            <h3>Mis anuncios</h3>
            <hr />
            <RentList rents={ownRents} />
          </Col>
        </Row>

        <Row className='fav mt-5'>
          {favRents.length === 0 ? (
            <>
              <h3>No tienes favoritos</h3>
              <hr />
            </>
          ) : (
            <>
              <h3>Favoritos</h3>
              <hr />
              <RentList rents={favRents} />
            </>
          )}
        </Row>

        <hr />

        <Link to='/lista' className='d-grid mb-5 no-padding'>
          <Button className='app-theme-color w-100'>Volver</Button>
        </Link>
      </Container>
    </>
  )
}

export default ProfilePage
