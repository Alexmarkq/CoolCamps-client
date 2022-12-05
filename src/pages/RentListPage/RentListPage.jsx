import { useState, useEffect } from "react"
import RentList from "../../components/RentList/RentList"
import rentService from "../../services/Rent.service"
import { Container, Button, Modal } from 'react-bootstrap'
import { Link } from "react-router-dom"

import NewRentForm from "../../components/NewRentForm/NewRentForm"

const RentListPage = () => {

    const [rents, setRents] = useState()
    const [showModal, setShowModal] = useState(false)

    const openModal = () => setShowModal(true)
    const closeModal = () => setShowModal(false)

    const loadRents = () => {

        rentService
            .getRents()
            .then(({ data }) => setRents(data))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        loadRents()
    }, [])

    return (
        <>
            <Container>
                <h2 className="mt-4">Lista de alquileres</h2>
                <Button onClick={openModal} variant="dark" size="sm">Crear nueva</Button>
                <hr />
                {!rents ? <h1>Cargando</h1> : <RentList rents={rents} />}
                <hr />
                <Link to="/">
                    <Button variant="outline-secondary">Volver al inicio</Button>
                </Link>
            </Container>

            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Nuevo Anuncio</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <NewRentForm closeModal={closeModal} refreshList={loadRents} />
                </Modal.Body>
            </Modal>
        </>
    )

}

export default RentListPage