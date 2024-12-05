import { useState, useContext } from "react"
import { Container, Form, Button, Row, Col } from "react-bootstrap"
import ErrorMessage from "../ErrorMessage/ErrorMessage"
import UploadServices from "../../services/Upload.service"
import rentService from "../../services/Rent.service"
import { RentContext } from '../../contexts/rent.context'


const RentEditForm = ({ fireFinalActions, rent }) => {

    const { loadRents } = useContext(RentContext)

    const [errors, setErrors] = useState([])
    const [loadingImage, setLoadingImage] = useState(false)

    const { title, description, price, imageUrl, lat, lng, _id, city } = rent

    const [rentData, setRentData] = useState({
        title: title,
        description: description,
        price: price,
        imageUrl: imageUrl,
        lat: lat,
        lng: lng,
        city: city
    })

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
            .editRent(rentData, _id)
            .then(() => {
                fireFinalActions()
                loadRents()
            })
            .catch(err => setErrors(err.response.data.errorMessages))
    }

    return (
        <Container>

            < Form onSubmit={handleFormSubmit} >
                <Form.Group className="mb-3" controlId="title">
                    <Form.Label>Título</Form.Label>
                    <Form.Control type="text" name="title" value={rentData.title} onChange={handleInputChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control type="text" name="description" value={rentData.description} onChange={handleInputChange} />
                </Form.Group>


                <Form.Group className="mb-3" controlId="price">
                    <Form.Label>Precio</Form.Label>
                    <Form.Control type="number" name="price" value={rentData.price} onChange={handleInputChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="coords">
                    <Form.Label>Ubicación (Coordenadas)</Form.Label>
                    <Row>
                        <Col><Form.Control type="text" name="lat" value={rentData.lat} onChange={handleInputChange} /></Col>
                        <Col> <Form.Control type="text" name="lng" value={rentData.lng} onChange={handleInputChange} /></Col>
                    </Row>
                </Form.Group>

                <Form.Group className="mb-3" controlId="city">
                    <Form.Label>Ciudad</Form.Label>
                    <Form.Control type="text" name="city" value={rentData.city} onChange={handleInputChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="image">
                    <Form.Label>Imagen</Form.Label>
                    <Form.Control type="file" onChange={handleFileUpload} />
                </Form.Group>

                {errors.length ? <ErrorMessage>{errors.map(elm => <div key={elm}>{elm}</div>)}</ErrorMessage> : undefined}

                <div className="d-grid">
                    <Button variant="outline-secondary" type="submit" disabled={loadingImage}>{loadingImage ? 'Subiendo imagen...' : 'Editar'}</Button>
                </div>
            </Form >
        </Container>
    )

}

export default RentEditForm