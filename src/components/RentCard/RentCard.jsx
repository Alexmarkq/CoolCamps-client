import './RentCard.css'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
import { AuthContext } from './../../contexts/auth.context'
import { useContext, useState } from 'react'



function RentCard({ title, description, imageUrl, _id, owner }) {

    const { user } = useContext(AuthContext)
    const [like, setLike] = useState(false)

    return (

        <>
            <Card className="bg-dark text-white">
                <Card.Img variant="top" src={imageUrl} />
                <Card.ImgOverlay>
                    <Link to={`/detalles/${_id}`}>
                        <Card.Title >{title}</Card.Title>
                    </Link>
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

                        <h2 onClick={() => setLike((prevLike) => !prevLike)}>
                            {like ? "❤️" : "♡"}
                        </h2>
                    </Card.Text>
                </Card.ImgOverlay>
            </Card>
        </>
    );
}

export default RentCard