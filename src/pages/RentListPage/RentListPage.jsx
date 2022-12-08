import RentList from "../../components/RentList/RentList"
import { Container, Button } from 'react-bootstrap'
import { Link } from "react-router-dom"
import { useContext, useEffect } from "react"
import { RentContext } from "../../contexts/rent.context"


const RentListPage = () => {

    const { loadRents, rents } = useContext(RentContext)

    useEffect(() => {
        loadRents()
    }, [])

    return (
        <>
            <Container>
                <h2 className="mt-4">Lista de alquileres</h2>
                <hr />
                <RentList rents={rents} />
                <hr />
                <Link to="/">
                    <Button variant="outline-secondary">Volver al inicio</Button>
                </Link>
            </Container>
        </>
    )

}

export default RentListPage