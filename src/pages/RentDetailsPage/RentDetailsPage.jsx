import './RentDetailsPage.css'
import { useEffect, useState } from "react"
import { Container, Row, Col, Button } from "react-bootstrap"
import { Link, useParams } from "react-router-dom"
import { AuthContext } from './../../contexts/auth.context'
import { useContext } from 'react'
import rentService from "./../../services/Rent.service"
import Maps from '../../components/Maps/Maps'
import Loader from "../../components/Loader/Loader"



const RentDetailsPage = () => {

    const { user } = useContext(AuthContext)

    const [rent, setRent] = useState({})

    const { rent_id } = useParams()


    const oneRent = () => {

        rentService
            .getOneRent(rent_id)
            .then(({ data }) => setRent(data))
            .catch(err => console.error(err))
    }

    useEffect(() => {
        oneRent()
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

                        </Row>
                        <hr />
                        <Link to="/lista">
                            <Button as="div" variant="outline-secondary">Volver</Button>
                        </Link>



                    </>


            }

        </Container >
    )
}

export default RentDetailsPage