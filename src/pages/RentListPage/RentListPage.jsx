import { useState, useEffect } from "react"
import RentList from "../../components/RentList/RentList"
import rentService from "../../services/Rent.service"
import { Container, Button } from 'react-bootstrap'
import { Link } from "react-router-dom"


const RentListPage = () => {

    const [rents, setRents] = useState()

    useEffect(() => {
        rentService
            .getRents()
            .then(({ data }) => setRents(data))
            .catch(err => console.log(err))
    }, [])

    return (

        <Container>
            <h2>Lista de alquileres</h2>
            <hr />
            {!rents ? <h1>Cargando</h1> : <RentList rents={rents} />}
            <hr />
            <Link to="/">
                <Button variant="outline-secondary" as="div">Volver al inicio</Button>
            </Link>
        </Container>
    )

}

export default RentListPage