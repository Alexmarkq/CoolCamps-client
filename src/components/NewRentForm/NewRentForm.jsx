import { useState, useContext } from "react"
import { Form, Button } from "react-bootstrap"
import rentService from "../../services/Rent.service"



const NewRentForm = () => {

    const [rentData, setRentData] = useState({
        title: '',
        description: '',
        price: 0,
        imageUrl: ''
    })

    const handleInputChange = e => {
        const { name, value } = e.target
        setRentData({ ...rentData, [name]: value })
    }

    const handleFormSubmit = e => {
        e.preventDefault()

        rentService
            .saveRent(rentData)
            .then(() => {
                console.log('Done!!! Bitches')
            })
            .catch(err => console.error(err))

    }


    const { title, description, price, imageUrl } = rentData

    return (
        <Form onSubmit={handleFormSubmit}>
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

            <Form.Group className="mb-3" controlId="image">
                <Form.Label>Imagen (URL)</Form.Label>
                <Form.Control type="url" name="imageUrl" value={imageUrl} onChange={handleInputChange} />
            </Form.Group>

            <div className="d-grid">
                <Button variant="outline-secondary" type="submit">Crear montaña rusa</Button>
            </div>
        </Form>
    )


}
export default NewRentForm