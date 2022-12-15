import RentList from "../../components/RentList/RentList"
import { Container, Button, Row } from 'react-bootstrap'
import { Link } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { RentContext } from "../../contexts/rent.context"
import Loader from "../../components/Loader/Loader"
import SearchBar from "../../components/SearchBar/SearchBar"
import Maps from "../../components/Maps/Maps"



const RentListPage = () => {

    const { loadRents, rents } = useContext(RentContext)
    const [filteredRents, setFlteredRents] = useState()

    useEffect(() => {
        loadRents()
    }, [])

    useEffect(() => {
        if (rents) {
            const filtered = rents.filter(el => el.state === 'Enable')
            setFlteredRents(filtered)
        }
    }, [rents])

    const filterRents = (filterText) => {

        const resultRents = rents.filter(elm => {
            console.log(elm.state)
            return elm.city.toLowerCase().includes(filterText.toLowerCase()) && elm.state === 'Enable'
        })

        setFlteredRents(resultRents)
    }

    return (
        <>
            <Container>
                <h3 className="mt-4">Búsqueda</h3>
                <hr />
                <SearchBar filterRents={filterRents} />

                {!filteredRents
                    ?
                    <Loader />
                    :
                    <>

                        <Maps locations={filteredRents}
                            lat={filteredRents[0]?.location?.coordinates[0]}
                            lng={filteredRents[0]?.location?.coordinates[1]} />

                        <RentList rents={filteredRents} />
                    </>
                }
                <hr />
                <Row>
                    <Link to="/" className=" d-grid">
                        <Button variant="outline-secondary" >Volver al inicio</Button>
                    </Link>
                </Row>
            </Container>
        </>
    )

}

export default RentListPage