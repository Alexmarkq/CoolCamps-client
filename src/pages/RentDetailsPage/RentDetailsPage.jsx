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
            .then(({ data }) => { setReviews(data) })
            .catch(err => console.log(err))
    }

    const deleteReview = () => {
        reviewService
            .deleteReview(_id)
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
                {
                    !title
                        ?
                        <Loader />
                        :
                        <>
                            <Row>
                                <Col md={{ span: 8 }}>
                                    <h1 className="mb-4 mt-4">{title}</h1>
                                </Col>
                            </Row>

                            <hr />
                            <Row>

                                <Col md={{ span: 4 }} >

                                    <h3>Especificaciones</h3>
                                    <p>{description}</p>
                                    {
                                        owner || owner != user?._id
                                            ?
                                            <>
                                                {owner?.username}
                                            </>
                                            :
                                            <h1>Mi caravana</h1>
                                    }
                                    <h4> {price} € / Día</h4>
                                    <p>{city}</p>


                                </Col>

                                <Col className='details' md={{ span: 4 }}>
                                    <img className='details mb-2' src={imageUrl} style={{ width: '100%' }} />
                                </Col>

                                <Col className="Maps" md={{ span: 4 }}>
                                    <p> <Maps lat={location.coordinates[0]} lng={location.coordinates[1]} /></p>
                                </Col>

                                <div>
                                    <Button onClick={openModal} as="div" variant="outline-secondary">Crear comentario</Button>
                                </div>

                            </Row>
                            <hr />
                            {reviews.map(elm => {

                                return (


                                    <Card key={elm._id} className='mt-2' style={{ width: '100%' }}>
                                        <Card.Img variant='top' />
                                        <Card.Body>
                                            <Card.Title>{elm.title}</Card.Title>
                                        </Card.Body>
                                        <ListGroup className="list-group-flush">
                                            <ListGroup.Item>{elm.description}</ListGroup.Item>

                                        </ListGroup>
                                        <ListGroup className="list-group-flush">
                                            <ListGroup.Item>{user.username}</ListGroup.Item>

                                        </ListGroup>
                                        <Card.Text >


                                            <div className="d-grid mt-2">
                                                <Button variant="outline-danger" size="sm" onClick={deleteReview}>Borrar</Button>
                                            </div>



                                        </Card.Text>
                                    </Card>
                                )
                            })}


                            <Link to="/lista">
                                <Button as="div" className="mb-5 mt-5" variant="outline-secondary">Volver</Button>
                            </Link>
                        </>
                }
            </Container >


            < Modal show={showModal} onHide={closeModal} >
                <Modal.Header closeButton>
                    <Modal.Title>Crear comentario</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <NewReviewForm fireFinalActions={fireFinalActions} id={_id} />
                </Modal.Body >
            </Modal >

        </>
    )
}

export default RentDetailsPage