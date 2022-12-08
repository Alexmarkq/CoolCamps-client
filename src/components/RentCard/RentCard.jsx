import './RentCard.css'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
import { AuthContext } from './../../contexts/auth.context'
import { useContext } from 'react'


function RentCard({ title, description, imageUrl, _id, owner }) {

    const { user } = useContext(AuthContext)

    return (
        <Link to={`/detalles/${_id}`}>
            <Card className='mb-3 mt-3 RentCard' >
                <Card.Img variant="top" src={imageUrl} />
                <Card.Body>
                    <Card.Title >{title}</Card.Title>
                    <Card.Text >
                        {description}
                        {
                            !owner || owner != user?._id
                                ?
                                <>
                                    {owner.username}

                                </>
                                :
                                <h1>es mia</h1>
                        }

                    </Card.Text>

                </Card.Body>
            </Card>
        </Link >
    );
}

export default RentCard