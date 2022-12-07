import { useState, useEffect, useContext } from 'react';
import { Container, Nav, Navbar, NavDropdown, Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import NewRentForm from '../NewRentForm/NewRentForm'
import { RentContext } from '../../contexts/rent.context'
import { AuthContext } from '../../contexts/auth.context';
import SignupForm from '../SignupForm/SignupForm';
import LoginForm from '../LoginForm/LoginForm';


const Navigation = () => {

    const { loadRents } = useContext(RentContext)

    const { user, logoutUser } = useContext(AuthContext)

    const [showModal, setShowModal] = useState(false)
    const [showLoginModal, setShowLoginModal] = useState(false)

    const openLoginModal = () => setShowLoginModal(true)
    const closeLoginModal = () => setShowLoginModal(false)

    const openModal = () => setShowModal(true)
    const closeModal = () => setShowModal(false)

    const fireFinalActions = () => {
        closeLoginModal()
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
                <Nav.Link as="div"> {user && `Bienvenido ${user.username}!`}</Nav.Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="justify-content-end flex-grow-1 pe-3">
                        <Link to="/lista">
                            <Nav.Link as='div'>
                                Alquilar
                            </Nav.Link>
                        </Link>

                        <NavDropdown title="Perfil" id="basic-nav-dropdown">
                            {!user ?
                                <>


                                    <Link onClick={openLoginModal}>
                                        <NavDropdown.Item as="div">
                                            Iniciar Sesión
                                        </NavDropdown.Item>
                                    </Link>
                                    <Link to="/registro">
                                        <NavDropdown.Item as="div">
                                            Registro
                                        </NavDropdown.Item>
                                    </Link>
                                </>
                                :
                                <>
                                    <Link to="/perfil">
                                        <NavDropdown.Item as="div">
                                            Mi Perfil
                                        </NavDropdown.Item>
                                    </Link>
                                    <Link to="/">
                                        <NavDropdown.Item as="div" onClick={logoutUser}>Cerrar sesión
                                        </NavDropdown.Item>
                                    </Link>
                                </>
                            }
                        </NavDropdown>

                        {user ?

                            <>
                                <Button onClick={openModal} variant="outline-secondary" size="sm">Anunciar mi caravana</Button>

                            </>
                            :
                            <>
                                <Link onClick={openLoginModal}>
                                    <Button variant="outline-secondary" size="sm">Anunciar mi caravana</Button>
                                </Link>
                            </>
                        }
                    </Nav>
                </Navbar.Collapse>

            </Container>

            <Modal show={showLoginModal} onHide={closeLoginModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Accede</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <LoginForm fireFinalActions={fireFinalActions} />
                </Modal.Body>
            </Modal>

            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Alquila tu caravana</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <NewRentForm fireFinalActions={fireFinalActions} />
                </Modal.Body>
            </Modal>

        </Navbar >
    )
}

export default Navigation