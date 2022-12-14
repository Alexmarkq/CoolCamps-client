import { useState, useEffect, useContext } from 'react'
import { Container, Nav, Navbar, NavDropdown, Button, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import NewRentForm from '../NewRentForm/NewRentForm'
import { RentContext } from '../../contexts/rent.context'
import { AuthContext } from '../../contexts/auth.context'
import LoginForm from '../LoginForm/LoginForm'
import "../Navigation/Navigation.css"
import "./Navigation.css"


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
        <Navbar className='NavBar' variant="dark" expand="lg">
            <Container>
                <Link to="/">
                    <Navbar.Brand as="div">🚐 Cool Camps </Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="justify-content-end flex-grow-1">
                        <Link to="/lista">
                            <Nav.Link as='div'>
                                Galería
                            </Nav.Link>
                        </Link>

                        <NavDropdown title=
                            {user
                                ?
                                <Navbar.Brand href="/perfil">
                                    <img
                                        src={user.profileImg}
                                        width="40"
                                        className="d-inline-block imageNav"
                                        alt="X"
                                    />
                                </Navbar.Brand>
                                :
                                "Perfil"} className='mx-3'>

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
                        {/* <Nav.Link as='div'>
                            {user && user.username}
                        </Nav.Link> */}

                        {user
                            ?
                            <>
                                <Button onClick={() => setModal({ visible: true, content: 'rent' })} variant="outline-light" size="md">Anuncia tu caravana</Button>

                            </>
                            :
                            <>
                                <Link onClick={() => setModal({ visible: true, content: 'login' })}>
                                    <Button variant="outline-light" size="md">Anuncia tu caravana</Button>
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