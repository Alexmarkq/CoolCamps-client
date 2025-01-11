import './RentDetailsPage.css'
import { useEffect, useState, useContext } from 'react'
import { Container, Row, Col, Button, Card, Modal } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import { AuthContext } from './../../contexts/auth.context'
import reviewService from '../../services/Review.service'
import rentService from './../../services/Rent.service'
import Maps from '../../components/Maps/Maps'
import Loader from '../../components/Loader/Loader'
import NewReviewForm from '../../components/NewReviewForm/NewReviewForm'
import SignupForm from '../../components/SignupForm/SignupForm'
import LoginForm from '../../components/LoginForm/LoginForm'

const RentDetailsPage = () => {
  const { user } = useContext(AuthContext)

  const [rent, setRent] = useState({})
  const [reviews, setReviews] = useState(null)
  const [modal, setModal] = useState({
    visible: false,
    content: '',
  })
  const closeModal = () => setModal({ visible: false })

  const modalTitles = {
    login: 'Accede',
    signup: 'Registro',
    comment: 'Nuevo comentario',
  }

  const { rent_id } = useParams()

  const allReview = () => {
    reviewService
      .showReview(rent_id)
      .then(({ data }) => {
        setReviews(data)
      })
      .catch((err) => console.log(err))
  }

  const deleteReview = (reviewId) => {
    reviewService
      .deleteReview(reviewId)
      .then(() => allReview())
      .catch((err) => err)
  }

  const oneRent = () => {
    rentService
      .getOneRent(rent_id)
      .then(({ data }) => setRent(data))
      .catch((err) => console.error(err))
  }

  const fireFinalActions = () => {
    closeModal()
    allReview()
  }

  useEffect(() => {
    oneRent()
    allReview()
  }, [])

  const { title, description, price, imageUrl, location, owner, _id, city } =
    rent

  return (
    <>
      <Container className='details'>
        {!title ? (
          <Loader />
        ) : (
          <>
            <Row>
              <Col md={{ span: 8 }}>
                <h1 className='mt-4'>{title}</h1>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col md={{ span: 4 }}>
                <h3>Especificaciones</h3>
                <div>{description}</div>
                <br />
                📍 {city}
                <br />
                <br />
                <div className='h4'>{price} €/Día</div>
                <div>{price * 6} €/Semana</div>
                {owner || owner != user?._id ? (
                  <>Propietario: {owner?.username}</>
                ) : (
                  <h1>Mi caravana</h1>
                )}
              </Col>

              <Col className='details mb-4 image' md={{ span: 4 }}>
                <img
                  className='details mb-2 mt-2 image'
                  alt='Detalle'
                  src={imageUrl}
                  style={{ width: '100%' }}
                />
              </Col>

              <Col className='Maps image' md={{ span: 4 }}>
                <div>
                  {' '}
                  <Maps
                    lat={location.coordinates[0]}
                    lng={location.coordinates[1]}
                  />
                </div>
                <br />
              </Col>
              {user && (
                <Row>
                  <Button
                    onClick={() =>
                      setModal({ visible: true, content: 'comment' })
                    }
                    as='div'
                    variant='outline-secondary'
                  >
                    Crear comentario
                  </Button>
                </Row>
              )}
            </Row>
            <hr />

            <h3>Comentarios</h3>
            {user ? (
              reviews && reviews.length > 0 ? (
                reviews.map((elm) => (
                  <div key={elm._id}>
                    <Card className='mt-3'>
                      <Card.Header>
                        <img
                          src={elm.owner.profileImg}
                          alt='Imagen perfil'
                          className='review-img'
                        />
                        {elm.owner.username}
                      </Card.Header>
                      <Card.Body>
                        <Card.Title>{elm.title}</Card.Title>
                        <Card.Text>{elm.description}</Card.Text>
                        {elm.owner._id === user?._id && (
                          <Button
                            variant='outline-danger'
                            onClick={() => deleteReview(elm._id)}
                          >
                            Borrar
                          </Button>
                        )}
                      </Card.Body>
                    </Card>
                  </div>
                ))
              ) : (
                <div className='mt-4'>
                  🤩 Se el primero en dejar un comentario!{' '}
                </div>
              )
            ) : (
              <div className='mt-4'>
                🧐{' '}
                <span
                  onClick={() => setModal({ visible: true, content: 'login' })}
                  style={{ cursor: 'pointer', color: 'blue' }}
                >
                  Inicia sesión
                </span>
                {' o '}
                <span
                  onClick={() => setModal({ visible: true, content: 'signup' })}
                  style={{ cursor: 'pointer', color: 'blue' }}
                >
                  regístrate
                </span>{' '}
                para ver los comentarios.
              </div>
            )}
            <Row className='mb-5 mt-5'>
              <Link to='/lista'>
                <Button className='mb-5 w-100' variant='outline-secondary'>
                  Volver
                </Button>
              </Link>
            </Row>
          </>
        )}
      </Container>

      <Modal show={modal.visible} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitles[modal.content] || ''}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modal.content === 'login' && (
            <LoginForm fireFinalActions={fireFinalActions} />
          )}
          {modal.content === 'comment' && (
            <NewReviewForm fireFinalActions={fireFinalActions} id={_id} />
          )}
          {modal.content === 'signup' && (
            <SignupForm fireFinalActions={fireFinalActions} />
          )}
        </Modal.Body>
      </Modal>
    </>
  )
}

export default RentDetailsPage
