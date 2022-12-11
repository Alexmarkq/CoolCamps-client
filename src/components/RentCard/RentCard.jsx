import './RentCard.css'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AuthContext } from './../../contexts/auth.context'
import { useContext, useState } from 'react'
import rentService from '../../services/Rent.service'
import { RentContext } from '../../contexts/rent.context'




function RentCard({ title, description, imageUrl, _id, owner }) {

    const { user } = useContext(AuthContext)
    const [like, setLike] = useState(false)
    const { loadUserRents } = useContext(RentContext)



    const likeRent = () => {

        rentService
            .likeRent(_id)
            .then(() => loadUserRents())
            .catch(err => console.log(err))
    }

    const unlikeRent = () => {

        rentService
            .unlikeRent(_id)
            .then(() => loadUserRents())
            .catch(err => console.log(err))
    }

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
                            {like ? <Button variant="outline-secondary" onClick={likeRent}>❤️</Button> : <Button variant="outline-secondary" onClick={unlikeRent}>♡</Button>}
                        </h2>
                        <Link to={'/perfil'}>
                            <div className='d-grid'>

                                <Button variant="outline-secondary" onClick={likeRent}>❤️</Button>

                                <Button variant="outline-secondary" onClick={unlikeRent}>♡</Button>


                            </div>
                        </Link>
                    </Card.Text>
                </Card.ImgOverlay>
            </Card>
        </>
    );
}

export default RentCard