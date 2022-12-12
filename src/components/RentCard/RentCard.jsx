import './RentCard.css'
import rentService from '../../services/Rent.service'
import { useContext, useState } from 'react'
import { Card, Button, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AuthContext } from './../../contexts/auth.context'
import { RentContext } from '../../contexts/rent.context'
import RentEditForm from '../RentEditForm/RentEditForm'


function RentCard(props) {

    const { title, description, price, imageUrl, location, owner, _id } = props

    const lat = location.coordinates[0]
    const lng = location.coordinates[1]

    const { user } = useContext(AuthContext)

    //const [rent, setRent] = useState(null)
    const [showModal, setShowModal] = useState(false)

    const openModal = () => setShowModal(true)
    const closeModal = () => setShowModal(false)

    const { getLikedRents, favRents, loadRents } = useContext(RentContext)

    const ids = favRents.map(el => el._id)

    const likeRent = () => {

        rentService
            .likeRent(_id)
            .then(() => getLikedRents())
            .then(() => loadRents())
            .catch(err => console.log(err))
    }

    const unlikeRent = () => {

        rentService
            .unlikeRent(_id)
            .then(() => getLikedRents())
            .then(() => loadRents())
            .catch(err => console.log(err))
    }

    const fireFinalActions = () => {
        closeModal()
    }

    const deleteRent = () => {
        rentService
            .deleteRent(_id)
            .then(() => fireFinalActions())
            .then(() => loadRents())
            .catch(err => (err))
    }



    return (
        <>
            <Card>
                <Card.Img variant="top" className='RentCard' src={imageUrl} />
                <Card.Body>
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
                    </Card.Text>
                    <Card.Text>
                        <h5> {price} €/Dia</h5>
                    </Card.Text>
                    <Card.Text>
                        {
                            !owner || owner != user?._id
                            &&
                            <p>Propietario:
                                {" " + owner.username}</p>
                        }
                    </Card.Text>
                    <Card.Text >
                        {owner?._id === user?._id
                            &&
                            <div className="d-grid mt-4">
                                <Button onClick={openModal} variant="outline-warning" size="sm">Editar</Button>
                            </div>
                        }
                        {
                            owner?._id === user?._id
                            &&
                            <div className="d-grid mt-2">
                                <Button variant="outline-danger" size="sm" onClick={deleteRent}>Borrar</Button>
                            </div>

                        }
                    </Card.Text>
                </Card.Body>
            </Card>

            < Modal show={showModal} onHide={closeModal} >
                <Modal.Header closeButton>
                    <Modal.Title>Editar</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <RentEditForm fireFinalActions={fireFinalActions} rent={{ title, description, price, imageUrl, lat, lng, _id }} />
                </Modal.Body >
            </Modal >
        </>
    );
}

export default RentCard