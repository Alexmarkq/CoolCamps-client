import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import authService from '../../services/Auth.service'
import UploadServices from '../../services/Upload.service'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import { toast } from 'react-hot-toast'

const SignupForm = ({ fireFinalActions }) => {
  const [errors, setErrors] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const [signupData, setSignupData] = useState({
    username: '',
    email: '',
    password: '',
    profileImg: '',
  })

  const handleFileUpload = (e) => {
    setIsLoading(true)
    const formData = new FormData()
    formData.append('imageData', e.target.files[0])

    UploadServices.uploadimage(formData)
      .then((res) => {
        setSignupData({ ...signupData, profileImg: res.data.cloudinary_url })
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false))
  }

  const handleInputChange = (e) => {
    const { value, name } = e.target
    setSignupData({ ...signupData, [name]: value })
  }
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    authService
      .signup(signupData)
      .then(() => {
        fireFinalActions()
        navigate('/')
        toast.success(`¡Usuario registrado con éxito!`, {
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

  const { username, password, email } = signupData

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className='mb-3' controlId='username'>
        <Form.Label>Nombre de usuario</Form.Label>
        <Form.Control
          type='text'
          value={username}
          onChange={handleInputChange}
          name='username'
          required
        />
      </Form.Group>

      <Form.Group className='mb-3' controlId='password'>
        <Form.Label>Contraseña</Form.Label>
        <Form.Control
          type='password'
          value={password}
          onChange={handleInputChange}
          name='password'
          required
        />
      </Form.Group>

      <Form.Group className='mb-3' controlId='email'>
        <Form.Label>Email</Form.Label>
        <Form.Control
          type='email'
          value={email}
          onChange={handleInputChange}
          name='email'
          required
        />
      </Form.Group>

      <Form.Group className='mb-3' controlId='image'>
        <Form.Label>Imagen</Form.Label>
        <Form.Control type='file' onChange={handleFileUpload} required />
      </Form.Group>

      {errors.length ? (
        <ErrorMessage>
          {errors.map((elm) => (
            <div key={elm}>{elm}</div>
          ))}
        </ErrorMessage>
      ) : undefined}

      <div className='d-grid'>
        <Button className='app-theme-color' type='submit' disabled={isLoading}>
          {isLoading ? (
            <>
              <span
                className='spinner-border spinner-border-sm me-2'
                role='status'
                aria-hidden='true'
              ></span>
              Cargando imagen...
            </>
          ) : (
            'Registrarme'
          )}
        </Button>
      </div>
    </Form>
  )
}
export default SignupForm
