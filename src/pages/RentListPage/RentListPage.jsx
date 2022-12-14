import RentList from "../../components/RentList/RentList"
import { Container, Button } from 'react-bootstrap'
import { Link } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { RentContext } from "../../contexts/rent.context"
import Loader from "../../components/Loader/Loader"
import SearchBar from "../../components/SearchBar/SearchBar"



const RentListPage = () => {

    const { loadRents, rents, setRents } = useContext(RentContext)
    const [showRents, setShowRents] = useState(rents)
    const [flag, setFlag] = useState(true)


    useEffect(() => {
        loadRents()
    }, [])

    if (rents && flag) {
        setFlag(false)
        setShowRents(rents)
    }


    return (

        <>
            <Container>
                <h2 className="mt-4">Lista de alquileres</h2>
                <hr />
                <h3>Buscar </h3>
                <SearchBar setShowRents={setShowRents} />

                {!showRents
                    ?
                    <Loader />
                    :
                    <RentList rents={showRents} />}
                <hr />

                <Link to="/">
                    <Button variant="outline-secondary">Volver al inicio</Button>
                </Link>

            </Container>
        </>
    )

}

export default RentListPage