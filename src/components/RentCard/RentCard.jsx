import './RentCard.css'
import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import rentService from '../../services/Rent.service'
import { Card, Button, Modal, Col, Row } from 'react-bootstrap'
import { AuthContext } from './../../contexts/auth.context'
import { RentContext } from '../../contexts/rent.context'
import RentEditForm from '../RentEditForm/RentEditForm'
import NewReviewForm from '../NewReviewForm/NewReviewForm'
import { toast } from 'react-hot-toast'

function RentCard(props) {
  const { user } = useContext(AuthContext)
  const { getLikedRents, favRents, loadRents, loadOwnRents } =
    useContext(RentContext)
  const navigate = useNavigate()
  const {
    title,
    description,
    price,
    imageUrl,
    location,
    owner,
    _id,
    city,
    state,
    profilePage,
  } = props

  const lat = location.coordinates[0]
  const lng = location.coordinates[1]

  const toastStyles = {
    style: {
      border: '1px solid #713200',
      padding: '10px',
      color: '#713200',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
    },
    iconTheme: {
      primary: '#713200',
      secondary: '#FFFAEE',
    },
  }

  const [modal, setModal] = useState({
    visible: false,
    content: '',
  })

  const closeModal = () => setModal({ visible: false })

  const ids = favRents.map((el) => el._id)

  const likeRent = () => {
    rentService
      .likeRent(_id)
      .then(() => {
        getLikedRents()
        loadRents()
      })
      .catch((err) => console.log(err))
  }

  const unlikeRent = () => {
    rentService
      .unlikeRent(_id)
      .then(() => {
        getLikedRents()
        loadRents()
      })
      .catch((err) => console.log(err))
  }

  const fireFinalActions = () => {
    closeModal()
    loadRents()
  }

  const deleteRent = () => {
    rentService
      .deleteRent(_id)
      .then(() => {
        toast.success(`Anuncio eliminado`, toastStyles)
        fireFinalActions()
        loadRents()
        loadOwnRents()
      })
      .catch((err) => err)
  }

  const enable = () => {
    rentService
      .enable(_id)
      .then(() => {
        toast.success(`Anuncio habilitado`, toastStyles)
        fireFinalActions()
        loadRents()
        loadOwnRents()
      })
      .catch((err) => err)
  }

  const disable = () => {
    rentService
      .disable(_id)
      .then(() => {
        toast.success(`Anuncio deshabilitado`, toastStyles)
        fireFinalActions()
        loadRents()
        loadOwnRents()
      })
      .catch((err) => err)
  }

  return (
    <>
      <Card className='rentcard mt-3'>
        <Link
          to={`/detalles/${_id}`}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <Card.Img variant='top' src={imageUrl} />
          <div className='d-flex flex-column'>
            <Card.Body>
              <div className='d-flex justify-content-between'>
                <Card.Title className='rentcard-title'>{title}</Card.Title>
                <span
                  onClick={(e) => {
                    e.preventDefault()
                    !ids.includes(_id) ? likeRent() : unlikeRent()
                  }}
                >
                  {!ids.includes(_id) ? '♡' : '❤️'}
                </span>
              </div>
              <div className='rentcard-description'>{description}</div>
            </Card.Body>
            <Card.Footer className='mt-auto'>
              <p>📍 {city}</p>
              <p className='h5'>{price} €/Día</p>
              <span>{price * 6} €/Semana</span>
              <br />
              {!profilePage &&
                (!owner ||
                  (owner !== user?._id && (
                    <p>
                      Propietario:{' '}
                      <span
                        onClick={(e) => {
                          e.preventDefault()
                          if (user) {
                            navigate(`/perfil/${owner._id}`)
                          } else {
                            toast.error(
                              `Debes iniciar sesión para ver el perfil del propietario.`,
                              toastStyles
                            )
                          }
                        }}
                        style={{ color: '#a6601b' }}
                      >
                        {owner.username}
                      </span>
                    </p>
                  )))}
            </Card.Footer>
          </div>
          <div>
            <Row className='button-container'>
              {owner?._id === user?._id ? (
                <>
                  <Col>
                    <span className='d-grid mt-2 mb-2'>
                      <Button
                        variant='outline-dark'
                        size='sm'
                        onClick={(e) => {
                          e.preventDefault()
                          state === 'Enable' ? disable() : enable()
                        }}
                      >
                        {state === 'Enable' ? 'Deshabilitar' : 'Habilitar'}
                      </Button>
                    </span>
                  </Col>
                  <Col>
                    <span className='d-grid mt-2 mb-2'>
                      <Button
                        onClick={(e) => {
                          e.preventDefault()
                          setModal({ visible: true, content: 'edit' })
                        }}
                        variant='outline-dark'
                        size='sm'
                      >
                        Editar
                      </Button>
                    </span>
                  </Col>
                  <Col>
                    <span className='d-grid mt-2'>
                      <Button
                        variant='outline-danger'
                        size='sm'
                        onClick={(e) => {
                          e.preventDefault()
                          deleteRent()
                        }}
                      >
                        Borrar
                      </Button>
                    </span>
                  </Col>
                </>
              ) : (
                <Col className='d-grid button-container'>
                  {user && (
                    <Button
                      className='app-theme-color'
                      onClick={(e) => {
                        e.preventDefault()
                        setModal({ visible: true, content: 'rent' })
                      }}
                      size='sm'
                    >
                      Reservar
                    </Button>
                  )}
                </Col>
              )}
            </Row>
          </div>
        </Link>
      </Card>

      <Modal show={modal.visible} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {(modal.content === 'edit' && 'Editar') ||
              (modal.content === 'rent' && 'Reserva')}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modal.content === 'edit' && (
            <RentEditForm
              fireFinalActions={fireFinalActions}
              rent={{
                title,
                description,
                price,
                imageUrl,
                lat,
                lng,
                _id,
                city,
              }}
            />
          )}
          {modal.content === 'rent' && (
            <NewReviewForm fireFinalActions={fireFinalActions} id={_id} />
          )}
        </Modal.Body>
      </Modal>
    </>
  )
}

export default RentCard
