import { createContext, useState } from "react"
import rentService from "../services/Rent.service"


const RentContext = createContext()


function RentProviderWrapper(props) {

    //useState([])
    const [rents, setRents] = useState()
    const [userRents, setUserRents] = useState([])

    const loadRents = () => {
        rentService
            .getRents()
            .then(({ data }) => setRents(data))
            .catch(err => console.log(err))
    }

    const loadUserRents = () => {
        rentService
            .getOwnProducts()
            .then(({ data }) => {
                setUserRents(data)
            })
            .catch(err => console.log(err))


    }

    return (
        <RentContext.Provider value={{ rents, userRents, loadRents, loadUserRents }}>
            {props.children}
        </RentContext.Provider >
    )
}

export { RentContext, RentProviderWrapper }