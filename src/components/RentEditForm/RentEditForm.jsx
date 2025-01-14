import { useState, useContext } from 'react'
import { Container, Form, Button, Row, Modal } from 'react-bootstrap'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import UploadServices from '../../services/Upload.service'
import rentService from '../../services/Rent.service'
import { RentContext } from '../../contexts/rent.context'
import Maps from '../Maps/Maps'

const RentEditForm = ({ fireFinalActions, rent }) => {
  const { loadRents } = useContext(RentContext)

  const [loadingImage, setLoadingImage] = useState(false)
  const [showMap, setShowMap] = useState(false)
  const [errors, setErrors] = useState([])

  const { title, description, price, imageUrl, lat, lng, _id, city } = rent

  const [rentData, setRentData] = useState({
    title: title,
    description: description,
    price: price,
    imageUrl: imageUrl,
    lat: lat,
    lng: lng,
    city: city,
  })

  const handleMapClick = ({ lat, lng }) => {
    setRentData({ ...rentData, lat, lng })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setRentData({ ...rentData, [name]: value })
  }

  const handleFileUpload = (e) => {
    setLoadingImage(true)

    const formData = new FormData()

    formData.append('imageData', e.target.files[0])

    UploadServices.uploadimage(formData)
      .then((res) => {
        setRentData({ ...rentData, imageUrl: res.data.cloudinary_url })
        setLoadingImage(false)
      })
      .catch((err) => console.log(err))
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()

    rentService
      .editRent(rentData, _id)
      .then(() => {
        fireFinalActions()
        loadRents()
      })
      .catch((err) => {
        const errorMessages = err.response?.data?.errorMessages ||
          err.response?.data?.message || ['Error inesperado']
        setErrors(
          Array.isArray(errorMessages) ? errorMessages : [errorMessages]
        )
      })
  }

  return (
    <Container>
      <Form onSubmit={handleFormSubmit}>
        <Form.Group className='mb-3' controlId='image'>
          <Form.Label>Imagen</Form.Label>
          <Form.Control
            type='file'
            onChange={handleFileUpload}
            accept='image/jpeg, image/png, image/gif'
            required
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='title'>
          <Form.Label>Título</Form.Label>
          <Form.Control
            type='text'
            name='title'
            value={rentData.title}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='description'>
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            type='text'
            name='description'
            value={rentData.description}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='price'>
          <Form.Label>Precio por día (€)</Form.Label>
          <Form.Control
            className='no-spinners'
            type='number'
            name='price'
            value={rentData.price}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='city'>
          <Form.Label>Ciudad</Form.Label>
          <Form.Control
            type='text'
            name='city'
            value={rentData.city}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='coords'>
          <Form.Label>Ubicación</Form.Label>
          <Row>
            <Button
              onClick={() => setShowMap(true)}
              className='app-theme-color'
            >
              Desplegar mapa
            </Button>
          </Row>
        </Form.Group>

        {errors.length ? (
          <ErrorMessage>
            {errors.map((elm) => (
              <div key={elm}>{elm}</div>
            ))}
          </ErrorMessage>
        ) : undefined}

        <div className='d-grid'>
          <Button
            className='app-theme-color submit-margin'
            type='submit'
            disabled={loadingImage}
          >
            {loadingImage ? 'Subiendo imagen...' : 'Editar'}
          </Button>
        </div>
      </Form>
      <Modal show={showMap} onHide={() => setShowMap(false)} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Selecciona la ubicación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Maps
            lat={lat || 40.41681527173044}
            lng={lng || -3.7033220332509402}
            onMapClick={handleMapClick}
            selectable={true}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => setShowMap(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}

export default RentEditForm
