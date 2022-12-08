import RentCard from "../RentCard/RentCard"
import { Row, Col } from 'react-bootstrap'


const RentList = ({ rents }) => {

    return (

        !rents
            ? <h2>Cargando</h2>
            : <Row>
                {rents.map(elm => {
                    return (
                        <Col key={elm._id} sm={{ span: 4 }}>
                            <RentCard {...elm} />
                        </Col>)
                })}
            </Row>

    )
}
export default RentList