import { useState } from "react"
import { Form, Button, Container } from "react-bootstrap"
import reviewService from "../../services/Review.service"
import { useLocation } from "react-router-dom"



const NewReviewForm = ({ id }) => {

    const [reviewInfo, setReviewInfo] = useState({
        title: '',
        description: ''
    })

    const handleInputChange = e => {
        const { name, value } = e.target
        setReviewInfo({ ...reviewInfo, [name]: value })
    }

    const handleFormSubmit = e => {

        e.preventDefault()

        reviewService
            .saveReview(id, reviewInfo)
            .then(() => console.log("hola"))
            .catch(err => console.log(err))
    }

    const { title, description } = reviewInfo

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
                    <Button variant="outline-secondary" type="submit"> Crear comentario</Button>
                </div>
            </Form >
        </Container>
    )

}
export default NewReviewForm