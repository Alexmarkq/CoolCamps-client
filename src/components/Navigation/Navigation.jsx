import { useState, useEffect, useContext } from 'react';
import { Container, Nav, Navbar, NavDropdown, Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import NewRentForm from '../NewRentForm/NewRentForm'

import { RentContext } from '../../contexts/rent.context'


const Navigation = () => {

    const { loadRents } = useContext(RentContext)

    const [showModal, setShowModal] = useState(false)

    const openModal = () => setShowModal(true)
    const closeModal = () => setShowModal(false)

    const fireFinalActions = () => {
        closeModal()
        loadRents()
    }

    useEffect(() => {
        loadRents()
    }, [])


    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Link to="/">
                    <Navbar.Brand as="div">🚐 Cool Camps </Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="justify-content-end flex-grow-1 pe-3">
                        <Link to="/lista">
                            <Nav.Link as='div'>
                                Alquilar
                            </Nav.Link>
                        </Link>

                        <NavDropdown title="Perfil" id="basic-nav-dropdown">
                            <Link to="/perfil">
                                <NavDropdown.Item as="div">
                                    Mi Perfil
                                </NavDropdown.Item>
                            </Link>
                            <Link to="/iniciar-sesion">
                                <NavDropdown.Item as="div">
                                    Iniciar Sesión
                                </NavDropdown.Item>
                            </Link>
                            <Link to="/cerrar-sesion">
                                <NavDropdown.Item as="div">
                                    Cerrar  Sesión
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                            </Link>
                            <Link to="/registro">
                                <NavDropdown.Item as="div">
                                    Registro
                                </NavDropdown.Item>
                            </Link>
                        </NavDropdown>

                        <Button onClick={openModal} variant="outline-secondary" size="sm">Anunciar mi caravana</Button>

                        <Modal show={showModal} onHide={closeModal}>
                            <Modal.Header closeButton>
                                <Modal.Title>Alquila tu caravana</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <NewRentForm fireFinalActions={fireFinalActions} />
                            </Modal.Body>
                        </Modal>

                    </Nav>
                </Navbar.Collapse>

            </Container>
        </Navbar >
    )
}

export default Navigation