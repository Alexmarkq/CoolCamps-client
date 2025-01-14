import { useState, useContext } from 'react'
import { Form, Button } from 'react-bootstrap'
import { AuthContext } from '../../contexts/auth.context'
import authService from '../../services/Auth.service'
import ErrorMessage from '../ErrorMessage/ErrorMessage'

const LoginForm = ({ fireFinalActions }) => {
  const [errors, setErrors] = useState([])

  const [signupData, setSignupData] = useState({
    email: '',
    password: '',
  })

  const handleInputChange = (e) => {
    const { value, name } = e.target
    setSignupData({ ...signupData, [name]: value })
  }

  const { storeToken, authenticateUser } = useContext(AuthContext)

  const handleSubmit = (e) => {
    e.preventDefault()

    authService
      .login(signupData)
      .then(({ data }) => {
        const tokenFromServer = data.authToken
        storeToken(tokenFromServer)
        authenticateUser()
        fireFinalActions()
      })
      .catch((err) => {
        const errorMessages = err.response?.data?.errorMessages ||
          err.response?.data?.message || ['Error inesperado']
        setErrors(
          Array.isArray(errorMessages) ? errorMessages : [errorMessages]
        )
      })
  }

  const { password, email } = signupData

  return (
    <Form onSubmit={handleSubmit}>
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

      {errors.length ? (
        <ErrorMessage>
          {errors.map((elm) => (
            <div key={elm}>{elm}</div>
          ))}
        </ErrorMessage>
      ) : undefined}

      <div className='d-grid'>
        <Button className='app-theme-color' type='submit'>
          Acceder
        </Button>
      </div>
    </Form>
  )
}

export default LoginForm
