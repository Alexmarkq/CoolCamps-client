import { useState } from "react"
import { Form, Button, Container, Row, Col } from "react-bootstrap"
import rentService from "../../services/Rent.service"
import UploadServices from "../../services/Upload.service"
import ErrorMessage from "../ErrorMessage/ErrorMessage"
import "./NewRentForm.css"

const NewRentForm = ({ fireFinalActions }) => {

    const [rentData, setRentData] = useState({
        title: '',
        description: '',
        price: 0,
        imageUrl: '',
        city: '',
        lat: 0,
        lng: 0

    })

    const [loadingImage, setLoadingImage] = useState(false)

    const [errors, setErrors] = useState([])

    const handleInputChange = e => {
        const { name, value } = e.target
        setRentData({ ...rentData, [name]: value })
    }

    const handleFileUpload = e => {

        setLoadingImage(true)

        const formData = new FormData()
        formData.append('imageData', e.target.files[0])

        UploadServices
            .uploadimage(formData)
            .then(res => {
                setRentData({ ...rentData, imageUrl: res.data.cloudinary_url })
                setLoadingImage(false)
            })
            .catch(err => console.log(err))

    }


    const handleFormSubmit = e => {

        e.preventDefault()
        rentService
            .saveRent(rentData)
            .then(() => { fireFinalActions() })
            .catch(err => setErrors(err.response.data.errorMessages))

    }

    const { title, description, price, lat, lng, city } = rentData

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


                <Form.Group className="mb-3" controlId="price">
                    <Form.Label>Precio</Form.Label>
                    <Form.Control type="number" name="price" value={price} onChange={handleInputChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="city">
                    <Form.Label>Ciudad</Form.Label>
                    <Form.Control type="text" name="city" value={city} onChange={handleInputChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="coords">
                    <Form.Label>Ubicación (Coordenadas)</Form.Label>
                    <Row>
                        <Col><Form.Control type="text" name="lat" value={lat} onChange={handleInputChange} /></Col>
                        <Col> <Form.Control type="text" name="lng" value={lng} onChange={handleInputChange} /></Col>
                    </Row>
                </Form.Group>

                <Form.Group className="mb-3" controlId="image">
                    <Form.Label>Imagen</Form.Label>
                    <Form.Control type="file" onChange={handleFileUpload} />
                </Form.Group>

                {errors.length ? <ErrorMessage>{errors.map(elm => <div key={elm}>{elm}</div>)}</ErrorMessage> : undefined}

                <div className="d-grid mt-4">
                    <Button
                        className="color"
                        variant="outline-secondary"
                        type="submit"
                        disabled={loadingImage}>{loadingImage
                            ?
                            'Subiendo imagen...'
                            :
                            'Crear anuncio'}</Button>
                </div>
            </Form >
        </Container>
    )



}
export default NewRentForm