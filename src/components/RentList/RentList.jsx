import RentCard from '../RentCard/RentCard'
import { Row, Col } from 'react-bootstrap'

const RentList = ({ rents, profilePage }) => {
  return (
    <Row>
      {rents.map((elm) => {
        return (
          <Col key={elm._id} md={{ span: 6 }}>
            <RentCard {...elm} profilePage={profilePage} />
          </Col>
        )
      })}
    </Row>
  )
}
export default RentList
