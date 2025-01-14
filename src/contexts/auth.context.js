import { createContext, useEffect, useState } from 'react'
import authService from '../services/Auth.service'
import { toast } from 'react-hot-toast'

const AuthContext = createContext()

const AuthProviderWrapper = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const storeToken = (token) => {
    localStorage.setItem('authToken', token)
  }

  const toastStyles = {
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
  }

  const authenticateUser = () => {
    const token = localStorage.getItem('authToken')
    const hasWelcome = localStorage.getItem('hasWelcome')

    if (token) {
      authService
        .verify(token)
        .then(({ data }) => {
          setUser(data)
          setIsLoading(false)
          if (!hasWelcome) {
            localStorage.setItem('hasWelcome', true)
            toast.success(`¡Bienvenido ${data.username}!`, toastStyles)
            localStorage.setItem('hasWelcome', true)
          }
        })
        .catch(() => {
          setUser(null)
          setIsLoading(false)
        })
    }
  }
  const logoutUser = () => {
    setUser(null)
    setIsLoading(false)
    localStorage.removeItem('authToken')
    toast.success(`Sesión cerrada`, toastStyles)
    localStorage.removeItem('hasWelcome')
  }

  useEffect(() => {
    authenticateUser()
  }, [])

  return (
    <AuthContext.Provider
      value={{ storeToken, authenticateUser, user, logoutUser, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProviderWrapper }
