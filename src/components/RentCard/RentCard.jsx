import './RentCard.css'
import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import rentService from '../../services/Rent.service'
import { Card, Button, Modal, Col, Row } from 'react-bootstrap'
import { AuthContext } from './../../contexts/auth.context'
import { RentContext } from '../../contexts/rent.context'
import RentEditForm from '../RentEditForm/RentEditForm'
import NewReviewForm from '../NewReviewForm/NewReviewForm'


function RentCard(props) {

    const { title, description, price, imageUrl, location, owner, _id, city, state } = props

    const lat = location.coordinates[0]
    const lng = location.coordinates[1]

    const { user } = useContext(AuthContext)

    const [modal, setModal] = useState({
        visible: false,
        content: ''
    })

    const closeModal = () => setModal({ visible: false })

    const { getLikedRents, favRents, loadRents, loadUserRents } = useContext(RentContext)

    const ids = favRents.map(el => el._id)

    const likeRent = () => {

        rentService
            .likeRent(_id)
            .then(() => {
                getLikedRents()
                loadRents()
            })
            .catch(err => console.log(err))
    }

    const unlikeRent = () => {

        rentService
            .unlikeRent(_id)
            .then(() => {
                getLikedRents()
                loadRents()
            })
            .catch(err => console.log(err))
    }

    const fireFinalActions = () => {
        closeModal()
        loadRents()
    }

    const deleteRent = () => {
        rentService
            .deleteRent(_id)
            .then(() => {
                fireFinalActions()
                loadRents()
                loadUserRents()
            })
            .catch(err => (err))
    }

    const enable = () => {
        rentService
            .enable(_id)
            .then(() => {
                fireFinalActions()
                loadUserRents()
                loadRents()
            })
            .catch(err => (err))

    }

    const disable = () => {
        rentService
            .disable(_id)
            .then(() => {
                fireFinalActions()
                loadUserRents()
                loadRents()
            })
            .catch(err => (err))

    }

    return (
        <>
            <Card className='RentCard mt-3'>
                <Link to={`/detalles/${_id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Card.Img variant="top" src={imageUrl} />
                    <Card.Body >
                        <Card.Text className="d-flex justify-content-between">
                                <Card.Title style={{ color: 'blue'}}>{title}</Card.Title>
                                <span
                                    onClick={(e) => {
                                        e.preventDefault(); 
                                        !ids.includes(_id) ? likeRent() : unlikeRent(); 
                                    }}
                                    >
                                    {!ids.includes(_id) ? '♡' : '❤️'}
                                </span>
                        </Card.Text>
                        <Card.Text>
                            <div> {description}</div>
                            <br />
                            📍 {city}

                        </Card.Text>
                        <Card.Text>
                            <div className="h5">{price} €/Día</div>
                        </Card.Text>
                        <Card.Text>
                            {
                                !owner || owner != user?._id
                                &&
                                <div>De:  {owner.username}</div>
                            }
                        </Card.Text>
                        <Card.Text >
                            <Row>
                                {owner?._id === user?._id
                                    ?
                                    <>
                                        <Col>
                                            <div className="d-grid mt-2">
                                                <Button onClick={() => setModal({ visible: true, content: 'edit' })}
                                                    variant="outline-warning" size="sm">Editar</Button>
                                            </div>
                                        </Col>
                                        <Col>
                                            <div className="d-grid mt-2">
                                                <Button variant="outline-danger" size="sm" onClick={deleteRent}>Borrar</Button>
                                            </div>
                                        </Col>
                                        {state === 'Enable'
                                            ?
                                            <Col>
                                                <div className="d-grid mt-2">
                                                    <Button variant="outline-dark" size="sm" onClick={disable}>Deshabilitar</Button>
                                                </div>
                                            </Col>
                                            :
                                            <Col>
                                                <div className="d-grid mt-2">
                                                    <Button variant="outline-dark" size="sm" onClick={enable}>Habilitar</Button>
                                                </div>
                                            </Col>
                                        }
                                    </>
                                    :
                                    <Col>
                                        {user
                                            &&
                                            <div className="d-grid mt-2">
                                                <Button onClick={() => setModal({ visible: true, content: 'rent' })}
                                                    variant="outline-dark" size="sm">Reservar</Button>
                                            </div>
                                        }
                                    </Col>
                                }
                            </Row>
                        </Card.Text>
                    </Card.Body>
                </Link>
            </Card>

            <Modal show={modal.visible} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {modal.content === 'edit' && 'Editar' ||
                            modal.content === 'rent' && 'Reserva'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {modal.content === 'edit' && <RentEditForm fireFinalActions={fireFinalActions} rent=
                        {{ title, description, price, imageUrl, lat, lng, _id, city }} />}
                    {modal.content === 'rent' && <NewReviewForm fireFinalActions={fireFinalActions} id={_id} />}
                </Modal.Body>
            </Modal>


        </>
    )
}

export default RentCard