import { useState, useNavigate } from "react"
import { Container, Form, Button } from "react-bootstrap"
import ErrorMessage from "../ErrorMessage/ErrorMessage"
import UploadServices from "../../services/Upload.service"



const RentEditForm = (props) => {

    const [errors, setErrors] = useState([])

    const { product } = props

    const [rentData, setRentData] = useState({
        title: product.title,
        description: product.description,
        price: product.price,
        imageUrl: product.imageUrl,
        lat: product.lat,
        lng: product.lng
    })

    const navigate = useNavigate()

    const handleInputChange = e => {
        const { name, value } = e.target
        setRentData({ ...rentData, [name]: value })
    }

    const handleFileUpload = e => {

        const formData = new FormData()

        formData.append('imageData', e.target.files[0])

        UploadServices
            .uploadimage(formData)
            .then(res => {
                setSignupData({ ...signupData, profileImg: res.data.cloudinary_url })

            })
            .catch(err => console.log(err))
    }

    const handleFormSubmit = e => {
        e.preventDefault()

        rentService
            .editRent(rentData, product._id)
            .then(() => navigate('/perfil'))
            .catch(err => setErrors(err.response.data.errorMessages))
    }


    return (
        <Container>
            <h1>Editar perfil</h1>
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

                {errors.length ? <ErrorMessage>{errors.map(elm => <p key={elm}>{elm}</p>)}</ErrorMessage> : undefined}

                <div className="d-grid">
                    <Button variant="outline-secondary" type="submit" disabled={loadingImage}>{loadingImage ? 'Subiendo imagen...' : 'Crear anuncio'}</Button>
                </div>
            </Form >
        </Container>
    )

}

export default RentEditForm