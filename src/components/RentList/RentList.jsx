import RentCard from "../RentCard/RentCard"
import { Row, Col } from 'react-bootstrap'


const RentList = ({ rents }) => {

    console.warn(rents)




    return (
        <Row>
            {rents.map(elm => {
                return (
                    <Col key={elm._id} sm={{ span: 6 }}>
                        <RentCard {...elm} />
                    </Col>
                )
            })}
        </Row>
    )
}
export default RentList