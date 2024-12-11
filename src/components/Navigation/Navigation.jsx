import {
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Button,
  Modal,
} from 'react-bootstrap'
import { useState, useContext } from 'react'
import { RentContext } from '../../contexts/rent.context'
import { AuthContext } from '../../contexts/auth.context'
import NewRentForm from '../NewRentForm/NewRentForm'
import SignupForm from '../SignupForm/SignupForm'
import LoginForm from '../LoginForm/LoginForm'
import { Link } from 'react-router-dom'
import '../Navigation/Navigation.css'
import './Navigation.css'

const Navigation = () => {
  const { loadRents } = useContext(RentContext)

  const { user, logoutUser } = useContext(AuthContext)

  const [modal, setModal] = useState({
    visible: false,
    content: '',
  })

  const closeModal = () => setModal({ visible: false })

  const fireFinalActions = () => {
    closeModal()
    loadRents()
  }

  const modalTitles = {
    login: 'Accede',
    rent: 'Anuncia tu camper',
    signup: 'Registro',
  }

  return (
    <Navbar className='NavBar' variant='dark' expand='lg'>
      <Container>
        <NavDropdown
          title={
            user ? (
              <Navbar.Brand href='/perfil'>
                <img
                  src={user.profileImg}
                  width='40'
                  className='d-inline-block imageNav'
                  alt='X'
                />
              </Navbar.Brand>
            ) : (
              <img
                src='https://res.cloudinary.com/dsqconqsu/image/upload/v1671119882/pxfyhdptihwg9fyjqibo.png'
                width='40'
                className='d-inline-block imageNav'
                alt='Imagen Perfil'
              />
            )
          }
          className='mx-3'
        >
          {!user ? (
            <>
              <Link
                onClick={() => setModal({ visible: true, content: 'login' })}
              >
                <NavDropdown.Item as='div'>Iniciar Sesión</NavDropdown.Item>
              </Link>
              <Link
                onClick={() => setModal({ visible: true, content: 'signup' })}
              >
                <NavDropdown.Item as='div'>Registro</NavDropdown.Item>
              </Link>
            </>
          ) : (
            <>
              <Link to='/perfil'>
                <NavDropdown.Item as='div'>Mi Perfil</NavDropdown.Item>
              </Link>
              <Link to='/'>
                <NavDropdown.Item as='div' onClick={logoutUser}>
                  Cerrar sesión
                </NavDropdown.Item>
              </Link>
            </>
          )}
        </NavDropdown>
        <Link to='/'>
          <Navbar.Brand as='div' className='cool'>
            Cool Camps
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='justify-content-end flex-grow-1'>
            <Link to='/lista'>
              <Nav.Link as='div' className='galery-text'>
                Buscar
              </Nav.Link>
            </Link>
            {user ? (
              <>
                <Button
                  className='button'
                  onClick={() => setModal({ visible: true, content: 'rent' })}
                  variant='outline-light'
                  size='md'
                >
                  Anuncia tu camper
                </Button>
              </>
            ) : (
              <>
                <Button
                  className='button'
                  onClick={() => setModal({ visible: true, content: 'login' })}
                  variant='outline-light'
                  size='md'
                >
                  Anuncia tu camper
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>

      <Modal show={modal.visible} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitles[modal.content] || ''}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modal.content === 'login' && (
            <LoginForm fireFinalActions={fireFinalActions} />
          )}
          {modal.content === 'rent' && (
            <NewRentForm fireFinalActions={fireFinalActions} />
          )}
          {modal.content === 'signup' && (
            <SignupForm fireFinalActions={fireFinalActions} />
          )}
        </Modal.Body>
      </Modal>
    </Navbar>
  )
}

export default Navigation
