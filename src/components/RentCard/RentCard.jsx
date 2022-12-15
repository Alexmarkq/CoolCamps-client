import './RentCard.css'
import rentService from '../../services/Rent.service'
import { useContext, useState } from 'react'
import { Card, Button, Modal, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AuthContext } from './../../contexts/auth.context'
import { RentContext } from '../../contexts/rent.context'
import RentEditForm from '../RentEditForm/RentEditForm'


function RentCard(props) {

    const { title, description, price, imageUrl, location, owner, _id, city } = props

    const lat = location.coordinates[0]
    const lng = location.coordinates[1]

    const { user } = useContext(AuthContext)

    const [showModal, setShowModal] = useState(false)

    const openModal = () => setShowModal(true)
    const closeModal = () => setShowModal(false)

    const { getLikedRents, favRents, loadRents } = useContext(RentContext)

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
    }

    const deleteRent = () => {
        rentService
            .deleteRent(_id)
            .then(() => {
                fireFinalActions()
                loadRents()
            })
            .catch(err => (err))
    }

    // const disable = () => {


    // }



    return (
        <>
            <Card className='RentCard mt-3'>
                <Card.Img variant="top" src={imageUrl} />
                <Card.Body >
                    <Card.Text className="d-flex justify-content-between">
                        <Link to={`/detalles/${_id}`}>
                            <Card.Title >{title}</Card.Title>
                        </Link>
                        <Link>{
                            !ids.includes(_id)
                                ?
                                <a onClick={likeRent}>♡</a>
                                :
                                <a onClick={unlikeRent}>❤️</a>
                        }</Link>
                    </Card.Text>
                    <Card.Text>
                        <p> {description}</p>
                        📍{city}
                    </Card.Text>
                    <Card.Text>
                        <h5> {price} €/Dia</h5>
                    </Card.Text>
                    <Card.Text>
                        {
                            !owner || owner != user?._id
                            &&
                            <> <p>Propietario:
                                {" " + owner.username}</p>
                            </>
                        }
                    </Card.Text>
                    <Card.Text >
                        <Row>
                            {
                                owner?._id === user?._id
                                    ?
                                    <>
                                        <Col>
                                            <div className="d-grid mt-2">
                                                <Button onClick={openModal} variant="outline-warning" size="sm">Editar</Button>
                                            </div>
                                        </Col>
                                        <Col>
                                            <div className="d-grid mt-2">
                                                <Button variant="outline-danger" size="sm" onClick={deleteRent}>Borrar</Button>
                                            </div>
                                        </Col>
                                        <Col>
                                            <div className="d-grid mt-2">
                                                <Button variant="outline-dark" size="sm">Deshabilitar</Button>
                                            </div>
                                        </Col>
                                    </>
                                    :
                                    <Col>
                                        <div className="d-grid mt-2">
                                            <Button variant="outline-dark" size="sm">Reservar</Button>
                                        </div>
                                    </Col>
                            }
                        </Row>
                    </Card.Text>

                </Card.Body>
            </Card>

            < Modal show={showModal} onHide={closeModal} >
                <Modal.Header closeButton>
                    <Modal.Title>Editar</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <RentEditForm fireFinalActions={fireFinalActions} rent={{ title, description, price, imageUrl, lat, lng, _id, city }} />
                </Modal.Body >
            </Modal >
        </>
    );
}

export default RentCard