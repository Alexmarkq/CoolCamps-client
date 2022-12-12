import { useState } from "react"
import { Form, Button, Container, Row, Col } from "react-bootstrap"
import rentService from "../../services/Rent.service"


const NewReviewForm = ({ fireFinalActions }) => {

    const [rentData, setRentData] = useState({
        title: '',
        description: ''
    })


    const handleInputChange = e => {
        const { name, value } = e.target
        setRentData({ ...rentData, [name]: value })
    }


    const handleFormSubmit = e => {

        e.preventDefault()
        reviewService
            .saveReview(rentData)
            .then(() => { fireFinalActions() })
            .catch(err => setErrors(err.response.data.errorMessages))

    }

    const { title, description, } = rentData

    return (

        <Container>
            < Form onSubmit={handleFormSubmit} >
                <Form.Group className="mb-3" controlId="title">
                    <Form.Label>Título</Form.Label>
                    <Form.Control type="text" name="title" value={title} onChange={handleInputChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control type="text" name="description" value={description} onChange={handleInputChange} />
                </Form.Group>

                <div className="d-grid">
                    <Button variant="outline-secondary" type="submit" disabled={loadingImage}>{loadingImage ? 'Subiendo imagen...' : 'Crear anuncio'}</Button>
                </div>
            </Form >
        </Container>
    )



}
export default NewReviewForm