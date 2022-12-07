import { useContext } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { AuthContext } from '../contexts/auth.context'


const PrivateRoute = () => {

    const { user, isLoading } = useContext(AuthContext)

    if (isLoading) {
        return <h1>Cargando....</h1>
    }

    if (!user) {
        return <Navigate to="/acceder" />
    }

    return <Outlet />
}

export default PrivateRoute