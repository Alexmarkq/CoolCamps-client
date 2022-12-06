import { createContext, useState } from "react"
import rentService from "../services/Rent.service"


const RentContext = createContext()

function RentProviderWrapper(props) {

    const [rents, setRents] = useState()

    const loadRents = () => {
        rentService
            .getRents()
            .then(({ data }) => setRents(data))
            .catch(err => console.log(err))
    }


    return (
        <RentContext.Provider value={{ rents, setRents, loadRents }}>
            {props.children}
        </RentContext.Provider >
    )
}

export { RentContext, RentProviderWrapper }