import { createContext, useEffect, useState } from "react";
import authService from "../services/Auth.service";

const AuthContext = createContext()

function AuthProviderWrapper(props) {

    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const storeToken = (token) => {
        localStorage.setItem("authToken", token)
    }

    const authenticateUser = () => {

        const token = localStorage.getItem("authToken")

        authService
            .verify(token)
            .then(({ data }) => {
                setUser(data)
                setIsLoading(false)
            })
            .catch(err => {
                setUser(null)
                setIsLoading(false)
            })
    }
    const logoutUser = () => {
        setUser(null)
        setIsLoading(false)
        localStorage.removeItem('authToken')
    }

    useEffect(() => {
        authenticateUser()
    }, [])


    return (
        <AuthContext.Provider value={{ storeToken, authenticateUser, user, logoutUser, isLoading }}>
            {props.children}
        </AuthContext.Provider>
    )

}

export { AuthContext, AuthProviderWrapper }