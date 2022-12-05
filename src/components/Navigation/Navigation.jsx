import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom'


const Navigation = () => {

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Link to="/">
                    <Navbar.Brand as="div">🚐 Cool Camps </Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link to="/alquiler/lista">
                            <Nav.Link as='div'>
                                Alquilar
                            </Nav.Link>
                        </Link>
                        <NavDropdown title="Perfil" id="basic-nav-dropdown">
                            <Link to="/usuarios/perfil">
                                <NavDropdown.Item as="div">
                                    Mi Perfil
                                </NavDropdown.Item>
                            </Link>
                            <Link to="/usuarios/iniciar-sesion">
                                <NavDropdown.Item as="div">
                                    Iniciar Sesión
                                </NavDropdown.Item>
                            </Link>
                            <Link to="/usuarios/cerrar-sesion">
                                <NavDropdown.Item as="div">
                                    Cerrar  Sesión
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                            </Link>
                            <Link to="/usuarios/crear">
                                <NavDropdown.Item as="div">
                                    Registro
                                </NavDropdown.Item>
                            </Link>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    )
}

export default Navigation