import { useState } from 'react'
import { Form, Button, Container, Row, Modal } from 'react-bootstrap'
import rentService from '../../services/Rent.service'
import UploadServices from '../../services/Upload.service'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import { toast } from 'react-hot-toast'
import Maps from '../Maps/Maps'

const NewRentForm = ({ fireFinalActions }) => {
  const [rentData, setRentData] = useState({
    title: '',
    description: '',
    price: 0,
    imageUrl: '',
    city: '',
    lat: 0,
    lng: 0,
  })

  const [loadingImage, setLoadingImage] = useState(false)
  const [showMap, setShowMap] = useState(false)
  const [errors, setErrors] = useState([])

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
      .saveRent(rentData)
      .then(() => {
        fireFinalActions()
        toast.success(`Anuncio creado con éxito!`, {
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
        })
      })
      .catch((err) => {
        const errorMessages = err.response?.data?.errorMessages ||
          err.response?.data?.message || ['Error inesperado']
        setErrors(
          Array.isArray(errorMessages) ? errorMessages : [errorMessages]
        )
      })
  }
  const handleMapClick = ({ lat, lng }) => {
    setRentData({ ...rentData, lat, lng })
  }

  const { title, description, price, lat, lng, city } = rentData

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
            value={title}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='description'>
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            type='text'
            name='description'
            value={description}
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
            value={price}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='city'>
          <Form.Label>Ciudad</Form.Label>
          <Form.Control
            type='text'
            name='city'
            value={city}
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

        <div className='d-grid mt-4'>
          <Button
            className='app-theme-color submit-margin'
            type='submit'
            disabled={loadingImage}
          >
            {loadingImage ? 'Subiendo imagen...' : 'Crear anuncio'}
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
          <Button className='app-theme-color' onClick={() => setShowMap(false)}>
            Aceptar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}
export default NewRentForm
