import './RentCard.css'
import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import rentService from '../../services/Rent.service'
import { Card, Button, Modal, Col, Row } from 'react-bootstrap'
import { AuthContext } from './../../contexts/auth.context'
import { RentContext } from '../../contexts/rent.context'
import RentEditForm from '../RentEditForm/RentEditForm'
import NewReviewForm from '../NewReviewForm/NewReviewForm'
import { toast } from 'react-hot-toast'

function RentCard(props) {
  const { user } = useContext(AuthContext)
  const { getLikedRents, favRents, loadRents, loadUserRents } =
    useContext(RentContext)
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
        loadUserRents()
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
        loadUserRents()
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
        loadUserRents()
      })
      .catch((err) => err)
  }

  return (
    <>
      <Card className='RentCard mt-3'>
        <Link
          to={`/detalles/${_id}`}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <Card.Img variant='top' src={imageUrl} />
          <Card.Body>
            <div className='d-flex justify-content-between'>
              <Card.Title style={{ color: '#a6601b' }}>{title}</Card.Title>
              <span
                onClick={(e) => {
                  e.preventDefault()
                  !ids.includes(_id) ? likeRent() : unlikeRent()
                }}
              >
                {!ids.includes(_id) ? '♡' : '❤️'}
              </span>
            </div>
            <p>{description}</p>
            <p>📍 {city}</p>
            <p className='h5'>{price} €/Día</p>
            {!owner || (owner !== user?._id && <p>De: {owner.username}</p>)}
            <div>
              <Row>
                {owner?._id === user?._id ? (
                  <>
                    <Col>
                      <span className='d-grid mt-2'>
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
                      <span className='d-grid mt-2'>
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
                  <Col>
                    {user && (
                      <span className='d-grid mt-2'>
                        <Button
                          className='app-theme-color'
                          onClick={() =>
                            setModal({ visible: true, content: 'rent' })
                          }
                          size='sm'
                        >
                          Reservar
                        </Button>
                      </span>
                    )}
                  </Col>
                )}
              </Row>
            </div>
          </Card.Body>
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
