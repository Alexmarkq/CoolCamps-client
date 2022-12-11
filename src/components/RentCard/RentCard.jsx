import './RentCard.css'
import { Card, Button, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AuthContext } from './../../contexts/auth.context'
import { useContext, useState } from 'react'
import RentEditForm from '../RentEditForm/RentEditForm'




function RentCard({ title, description, price, imageUrl, lat, lng, owner, _id }) {

    const { user } = useContext(AuthContext)

    const [rent, setRent] = useState(null)
    const [showModal, setShowModal] = useState(false)

    const openModal = () => setShowModal(true)
    const closeModal = () => setShowModal(false)

    const [like, setLike] = useState(false)

    const fireFinalActions = () => {
        closeModal()


    }

    return (

        <>
            <Card className="bg-dark text-white">
                <Card.Img variant="top" src={imageUrl} />
                <Card.ImgOverlay>
                    <Link to={`/detalles/${_id}`}>
                        <Card.Title >{title}</Card.Title>
                    </Link>
                    <Card.Text >
                        {description}
                        {
                            !owner || owner != user?._id
                                ?
                                <>
                                    {owner.username}

                                </>
                                :
                                <h4>Mi anuncio</h4>
                        }

                        <h2 onClick={() => setLike((prevLike) => !prevLike)}>
                            {like ? "❤️" : "♡"}
                        </h2>
                    </Card.Text>
                    <Card.Text >
                        <Button onClick={openModal} variant="outline-warning" size="sm">Editar</Button>
                    </Card.Text>
                </Card.ImgOverlay>
            </Card>


            < Modal show={showModal} onHide={closeModal} >
                <Modal.Header closeButton>
                    <Modal.Title>Editar</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <RentEditForm fireFinalActions={fireFinalActions} rent={{ title, description, price, imageUrl, lat, lng }} />
                </Modal.Body >
            </Modal >
        </>
    );
}

export default RentCard