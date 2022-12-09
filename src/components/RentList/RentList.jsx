import RentCard from "../RentCard/RentCard"
import { Row, Col } from 'react-bootstrap'
import Maps from "../Maps/Maps"




const RentList = ({ rents }) => {

    return (


        <Row>
            {rents.map(elm => {
                return (
                    <Col key={elm._id} sm={{ span: 4 }}>
                        <RentCard {...elm} />
                    </Col>
                )
            })}
        </Row>



    )
}
export default RentList