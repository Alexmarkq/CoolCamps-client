import RentCard from "../RentCard/RentCard"
import { Row, Col } from 'react-bootstrap'



const RentList = ({ rents, refreshRents }) => {


    return (

        <Row>
            {rents.map(elm => {
                return (
                    <Col key={elm._id} sm={{ span: 4 }}>
                        <RentCard {...elm} refreshRents={refreshRents} />
                    </Col>
                )
            })}
        </Row>

    )
}
export default RentList