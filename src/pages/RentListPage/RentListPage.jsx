import RentList from "../../components/RentList/RentList"
import { Container, Button } from 'react-bootstrap'
import { Link } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { RentContext } from "../../contexts/rent.context"
import Loader from "../../components/Loader/Loader"
import SearchBar from "../../components/SearchBar/SearchBar"



const RentListPage = () => {

    const { loadRents, rents } = useContext(RentContext)
    const [filteredRents, setFlteredRents] = useState()

    useEffect(() => {
        loadRents()
    }, [])

    useEffect(() => {
        rents && setFlteredRents(rents)
    }, [rents])

    const filterRents = (filterText) => {

        const resultRents = rents.filter(elm => {
            return elm.city.toLowerCase().includes(filterText.toLowerCase())
        })

        setFlteredRents(resultRents)
    }


    return (
        <>
            <Container>
                <h3 className="mt-4">Busca por ciudad</h3>
                <hr />
                <SearchBar filterRents={filterRents} />

                {!filteredRents
                    ?
                    <Loader />
                    :
                    <RentList rents={filteredRents} />}
                <hr />

                <Link to="/">
                    <Button variant="outline-secondary">Volver al inicio</Button>
                </Link>

            </Container>
        </>
    )

}

export default RentListPage