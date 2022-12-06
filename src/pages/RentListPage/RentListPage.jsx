import { useState, useEffect, useContext } from "react"
import RentList from "../../components/RentList/RentList"
import rentService from "../../services/Rent.service"
import { Container, Button, Modal } from 'react-bootstrap'
import { Link } from "react-router-dom"
import { RentContext } from "../../contexts/rent.context"


const RentListPage = () => {

    const { rents, loadRents } = useContext(RentContext)

    useEffect(() => {
        loadRents()
    }, [])

    return (
        <>
            <Container>
                <h2 className="mt-4">Lista de alquileres</h2>
                <hr />
                {!rents ? <h1>Cargando</h1> : <RentList rents={rents} />}
                <hr />
                <Link to="/">
                    <Button variant="outline-secondary">Volver al inicio</Button>
                </Link>
            </Container>
        </>
    )

}

export default RentListPage