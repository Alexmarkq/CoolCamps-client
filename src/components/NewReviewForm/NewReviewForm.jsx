import { useState } from 'react'
import { Form, Button, Container } from 'react-bootstrap'
import reviewService from '../../services/Review.service'
import { toast } from 'react-hot-toast'

const NewReviewForm = ({ fireFinalActions, id }) => {
  const [reviewInfo, setReviewInfo] = useState({
    title: '',
    description: '',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setReviewInfo({ ...reviewInfo, [name]: value })
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()

    reviewService
      .saveReview(id, reviewInfo)
      .then(() => {
        fireFinalActions()
        toast.success('Comentario publicado', {
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
      .catch((err) => console.log(err))
  }

  const { title, description } = reviewInfo

  return (
    <Container>
      <Form onSubmit={handleFormSubmit}>
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
          <Form.Label>Comentario</Form.Label>
          <Form.Control
            type='text'
            name='description'
            value={description}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <div className='d-grid mt-4'>
          <Button
            className='app-theme-color'
            variant='outline-secondary'
            type='submit'
          >
            Enviar
          </Button>
        </div>
      </Form>
    </Container>
  )
}
export default NewReviewForm
