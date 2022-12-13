import './RentDetailsPage.css'
import { useEffect, useState, useContext } from "react"
import { Container, Row, Col, Button, Card, ListGroup } from "react-bootstrap"
import { Link, useParams } from "react-router-dom"
import { AuthContext } from './../../contexts/auth.context'
import reviewService from '../../services/Review.service'
import rentService from "./../../services/Rent.service"
import Maps from '../../components/Maps/Maps'
import Loader from "../../components/Loader/Loader"


const RentDetailsPage = () => {

    const { user } = useContext(AuthContext)

    const [rent, setRent] = useState({})
    const [reviews, setReviews] = useState(null)

    const { rent_id } = useParams()

    const allReview = () => {

        reviewService
            .showReview(rent_id)
            .then(({ data }) => { setReviews(data) })
            .catch(err => console.log(err))
    }

    const oneRent = () => {

        rentService
            .getOneRent(rent_id)
            .then(({ data }) => setRent(data))
            .catch(err => console.error(err))
    }


    useEffect(() => {
        oneRent()
        allReview()
    }, [])


    const { title, description, price, imageUrl, location, owner } = rent


    return (

        <Container className='details'>
            {
                !title
                    ?
                    <Loader />
                    :
                    <>
                        <Row>
                            <Col md={{ span: 8, offset: 1 }}>
                                <h1 className="mb-4 mt-4">{title}</h1>
                            </Col>
                        </Row>

                        <hr />
                        <Row>

                            <Col md={{ span: 4, offset: 1 }} >

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

                            </Col>

                            <Col className='details' md={{ span: 4 }}>
                                <img className='details' src={imageUrl} style={{ width: '100%' }} />
                            </Col>

                            <Col className="Maps" md={{ span: 3 }}>
                                <p> <Maps lat={location.coordinates[0]} lng={location.coordinates[1]} /></p>
                            </Col>

                            <Link to={`/comentario/crear/${rent._id}`}>
                                <Button as="div" variant="outline-secondary">Crear comentario</Button>
                            </Link>

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
                                        <ListGroup.Item>{elm.owner.username}</ListGroup.Item>

                                    </ListGroup>
                                </Card>
                            )
                        })}


                        <Link to="/lista">
                            <Button as="div" className="mb-5 mt-5" variant="outline-secondary">Volver</Button>
                        </Link>



                    </>


            }

        </Container >
    )
}

export default RentDetailsPage