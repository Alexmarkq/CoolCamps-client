import { useEffect, useState } from "react"
import { Container, Row, Col, Button } from "react-bootstrap"
import { Link, useParams } from "react-router-dom"
import { AuthContext } from './../../contexts/auth.context'
import { useContext } from 'react'
import rentService from "./../../services/Rent.service"


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


    const { title, description, price, imageUrl, owner } = rent

    return (

        <Container>
            {
                !rent
                    ?
                    <h1>CARGANDO</h1>
                    :
                    <>
                        <h1 className="mb-4 mt-4">{title}</h1>
                        <hr />
                        <Row>

                            <Col md={{ span: 6, offset: 1 }}>
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

                            <Col md={{ span: 4 }}>
                                <img src={imageUrl} style={{ width: '100%' }} />
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