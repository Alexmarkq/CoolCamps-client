import './RentCard.css'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom';



function RentCard({ title, description, imageUrl, _id }) {
    return (
        <Link to={`/detalles/${_id}`}>
            <Card className='mb-3 mt-3 RentCard' >
                <Card.Img variant="top" src={imageUrl} />
                <Card.Body>
                    <Card.Title >{title}</Card.Title>
                    <Card.Text >
                        {description}
                    </Card.Text>

                </Card.Body>
            </Card>
        </Link >
    );
}

export default RentCard