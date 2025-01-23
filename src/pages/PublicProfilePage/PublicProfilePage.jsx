import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Container, Row, Col, Card, ListGroup, Button } from 'react-bootstrap'
import userService from '../../services/User.service'
import RentList from '../../components/RentList/RentList'
import Loader from '../../components/Loader/Loader'

const PublicProfilePage = () => {
  const { user_id } = useParams()
  const [user, setUser] = useState(null)
  const [userRents, setUserRents] = useState([])

  useEffect(() => {
    userService
      .getUser(user_id)
      .then(({ data }) => {
        setUser(data)
        setUserRents(data.rents)
      })
      .catch((err) => console.log(err))
  }, [user_id])

  const formatDate = (isoString) => {
    const date = new Date(isoString)
    const months = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ]
    const month = months[date.getMonth()]
    const year = date.getFullYear()
    return `${month} ${year}`
  }

  if (!user) {
    return <Loader />
  }

  return (
    <Container>
      <Row className='mt-4'>
        <Col className='col-xxl-3 col-xl-3 col-lg-6 col-md-6'>
          <h3>{user.username}</h3>
          <hr />
          <Card className='mt-4' style={{ width: '100%' }}>
            <Card.Img variant='top' src={user.profileImg} />
            <ListGroup className='list-group-flush'>
              <ListGroup.Item>
                Usuario desde {formatDate(user.createdAt)}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
      <Row className='mt-4'>
        <Col>
          <h3>
            {userRents.length > 0 ? 'Anuncios publicados' : 'Sin anuncios'}
          </h3>
          <hr />
          <RentList rents={userRents} profilePage={true} />
        </Col>
      </Row>
      <br />
      <Link to='/lista' className='d-grid mb-5 no-padding'>
        <Button className='app-theme-color w-100'>Volver</Button>
      </Link>
    </Container>
  )
}

export default PublicProfilePage
