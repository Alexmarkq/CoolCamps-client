import RentList from '../../components/RentList/RentList'
import { Container, Button, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { RentContext } from '../../contexts/rent.context'
import Loader from '../../components/Loader/Loader'
import SearchBar from '../../components/SearchBar/SearchBar'
import Maps from '../../components/Maps/Maps'
import './RentListPage.css'

const RentListPage = () => {
  const { loadRents, rents } = useContext(RentContext)
  const [filteredRents, setFlteredRents] = useState()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadRents()
  }, [])

  useEffect(() => {
    if (rents) {
      const filtered = rents.filter((el) => el.state === 'Enable')
      setFlteredRents(filtered)
      setIsLoading(false)
    }
  }, [rents])

  const filterRents = (filterText) => {
    const resultRents = rents.filter((elm) => {
      return (
        elm.city.toLowerCase().includes(filterText.toLowerCase()) &&
        elm.state === 'Enable'
      )
    })

    setFlteredRents(resultRents)
  }

  return (
    <>
      <Container>
        <h3 className='mt-4'>Búsqueda</h3>
        <hr />
        <SearchBar filterRents={filterRents} />

        {isLoading ? (
          <Loader />
        ) : (
          <>
            <Col className='map-padding'>
              <Maps
                locations={filteredRents}
                lat={filteredRents[0]?.location?.coordinates[0] || 40.416775}
                lng={filteredRents[0]?.location?.coordinates[1] || -3.70379}
              />
            </Col>

            <RentList rents={filteredRents} />
          </>
        )}
        <hr />
        <Row>
          <Link to='/' className='d-grid mb-5'>
            <Button className='w-100 app-theme-color'>Volver al inicio</Button>
          </Link>
        </Row>
      </Container>
    </>
  )
}

export default RentListPage
