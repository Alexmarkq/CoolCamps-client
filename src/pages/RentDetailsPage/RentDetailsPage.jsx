import './RentDetailsPage.css'
import { useEffect, useState, useContext } from "react"
import { Container, Row, Col, Button, Card, ListGroup, Modal } from "react-bootstrap"
import { Link, useParams } from "react-router-dom"
import { AuthContext } from './../../contexts/auth.context'
import reviewService from '../../services/Review.service'
import rentService from "./../../services/Rent.service"
import Maps from '../../components/Maps/Maps'
import Loader from "../../components/Loader/Loader"
import NewReviewForm from "../../components/NewReviewForm/NewReviewForm"


const RentDetailsPage = () => {

    const { user } = useContext(AuthContext)

    const [rent, setRent] = useState({})
    const [reviews, setReviews] = useState(null)
    const [showModal, setShowModal] = useState(false)


    const openModal = () => setShowModal(true)
    const closeModal = () => setShowModal(false)

    const { rent_id } = useParams()


    const allReview = () => {

        reviewService
            .showReview(rent_id)
            .then(({ data }) => {
                setReviews(data)
            })
            .catch(err => console.log(err))
    }

    const deleteReview = (reviewId) => {

        reviewService
            .deleteReview(reviewId)
            .then(() => allReview())
            .catch(err => (err))
    }

    const oneRent = () => {

        rentService
            .getOneRent(rent_id)
            .then(({ data }) => setRent(data))
            .catch(err => console.error(err))
    }

    const fireFinalActions = () => {
        closeModal()
        allReview()

    }

    useEffect(() => {
        oneRent()
        allReview()
    }, [])

    const { title, description, price, imageUrl, location, owner, _id, city } = rent

    return (
        <>
            <Container className='details'>
                {!title
                    ?
                    <Loader />
                    :
                    <>
                        <Row>
                            <Col md={{ span: 8 }}>
                                <h1 className="mt-4">{title}</h1>
                            </Col>
                        </Row>

                        <hr />
                        <Row>
                            <Col md={{ span: 4 }} >
                                <h3>Especificaciones</h3>

                                <p>{description}</p>

                                📍 {city}

                                <h4>{price} €/Día</h4>

                                <p>{price * 6} €/Semana</p>
                                {
                                    owner || owner != user?._id
                                        ?
                                        <>
                                            Propietario: {owner?.username}
                                        </>
                                        :
                                        <h1>Mi caravana</h1>
                                }
                            </Col>

                            <Col className='details mb-4 image' md={{ span: 4 }}>
                                <img className='details mb-2 mt-2 image' alt="detalle" src={imageUrl} style={{ width: '100%' }} />
                            </Col>

                            <Col className="Maps image" md={{ span: 4 }}>
                                <p> <Maps lat={location.coordinates[0]} lng={location.coordinates[1]} /></p>
                            </Col>
                            {user &&
                                <Row>
                                    <Button onClick={openModal} as="div" variant="outline-secondary">Crear comentario</Button>
                                </Row>
                            }

                        </Row>
                        <hr />

                        <h3>Comentarios</h3>
                        {reviews && reviews.map(elm => {
                            return (
                                <div key={elm._id}>
                                    <Card className="mt-3" >
                                        <Card.Header>
                                            <img src={elm.owner.profileImg} alt="Imagen Perfil" className="review-img" />
                                            {elm.owner.username}
                                        </Card.Header>
                                        <Card.Body>
                                            <Card.Title>{elm.title}</Card.Title>
                                            <Card.Text>
                                                {elm.description}
                                            </Card.Text>
                                            {
                                                (elm.owner._id === user?._id)
                                                &&
                                                <Button variant="outline-danger" onClick={() => deleteReview(elm._id)}>Borrar</Button>
                                            }
                                        </Card.Body>
                                    </Card>
                                </div>
                            )
                        })}
                       <Row className="mb-5 mt-5">
                            <Link to="/lista">
                                <Button variant="outline-secondary">Volver</Button>
                            </Link>
                        </Row>
                    </>
                }
            </Container >


            < Modal show={showModal} onHide={closeModal} >
                <Modal.Header closeButton>
                    <Modal.Title>Nuevo comentario</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <NewReviewForm fireFinalActions={fireFinalActions} id={_id} />
                </Modal.Body >
            </Modal >

        </>
    )
}

export default RentDetailsPage