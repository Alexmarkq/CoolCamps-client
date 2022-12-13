import { useState } from "react"
import { Form, Button } from "react-bootstrap"
import { useNavigate } from 'react-router-dom'
import authService from "../../services/Auth.service"
import UploadServices from "../../services/Upload.service"
import ErrorMessage from "../ErrorMessage/ErrorMessage"


const SignupForm = () => {

    const [errors, setErrors] = useState([])

    const [signupData, setSignupData] = useState({
        username: '',
        email: '',
        password: '',
        profileImg: ''
    })

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

    const handleInputChange = e => {
        const { value, name } = e.target
        setSignupData({ ...signupData, [name]: value })
    }
    const navigate = useNavigate()

    const handleSubmit = e => {

        e.preventDefault()

        authService
            .signup(signupData)
            .then(() => {
                navigate('/iniciar-sesion')
            })
            .catch(err => setErrors(err.response.data.errorMessages))
    }

    const { username, password, email } = signupData


    return (

        <Form onSubmit={handleSubmit}>

            <Form.Group className="mb-3" controlId="username">
                <Form.Label>Nombre de usuario</Form.Label>
                <Form.Control type="text" value={username} onChange={handleInputChange} name="username" />
            </Form.Group>


            <Form.Group className="mb-3" controlId="password">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" value={password} onChange={handleInputChange} name="password" />
            </Form.Group>


            <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={email} onChange={handleInputChange} name="email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="image">
                <Form.Label>Imagen</Form.Label>
                <Form.Control type="file" onChange={handleFileUpload} />
            </Form.Group>

            {errors.length ? <ErrorMessage>{errors.map(elm => <p key={elm}>{elm}</p>)}</ErrorMessage> : undefined}

            <div className="d-grid">
                <Button variant="dark" type="submit">Registrarme</Button>
            </div>

        </Form>
    )

}
export default SignupForm




