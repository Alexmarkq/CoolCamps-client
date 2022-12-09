import { useState, useEffect, useContext } from 'react'
import { Container, Nav, Navbar, NavDropdown, Button, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import NewRentForm from '../NewRentForm/NewRentForm'
import { RentContext } from '../../contexts/rent.context'
import { AuthContext } from '../../contexts/auth.context'
import SignupForm from '../SignupForm/SignupForm'
import LoginForm from '../LoginForm/LoginForm'


const Navigation = () => {

    const { loadRents } = useContext(RentContext)

    const { user, logoutUser } = useContext(AuthContext)

    const [modal, setModal] = useState({
        visible: false,
        content: ''
    })

    const closeModal = () => setModal({ visible: false })

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
                            {!user
                                ?
                                <>
                                    <Link onClick={() => setModal({ visible: true, content: 'login' })}>
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
                        {user
                            ?
                            <>
                                <Button onClick={() => setModal({ visible: true, content: 'rent' })} variant="outline-secondary" size="sm">Anunciar mi caravana</Button>

                            </>
                            :
                            <>
                                <Link onClick={() => setModal({ visible: true, content: 'login' })}>
                                    <Button variant="outline-secondary" size="sm">Anunciar mi caravana</Button>
                                </Link>
                            </>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>

            <Modal show={modal.visible} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{modal.content === 'login' ? 'Accede' : 'Alquila'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {modal.content === 'login' && <LoginForm fireFinalActions={fireFinalActions} />}
                    {modal.content === 'rent' && <NewRentForm fireFinalActions={fireFinalActions} />}
                </Modal.Body>
            </Modal>
        </Navbar >
    )
}

export default Navigation