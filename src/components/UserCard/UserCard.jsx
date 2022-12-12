import { Card, ListGroup, Button } from 'react-bootstrap'
import authService from '../../services/Auth.service'
import { useNavigate } from "react-router-dom"
import { Link } from 'react-router-dom'
import { AuthContext } from './../../contexts/auth.context'
import { useContext } from 'react'


function UserCard() {


    const { user, _id } = useContext(AuthContext)

    const { username, profileImg, email } = user

    console.log(user)


    const navigate = useNavigate()

    const deleteUser = () => {
        authService
            .deleteUser(_id)
            .then(() => navigate("/"))
            .catch(err => (err))
    }

    return (
        <Card className='mt-5' style={{ width: '50%' }}>
            <Card.Img variant='top' src={profileImg} />
            <Card.Body>
                <Card.Title>{username}</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroup.Item>{email}</ListGroup.Item>
                {user &&
                    <ListGroup.Item>
                        <Link to="/">
                            <Button onClick={deleteUser} variant="outline-danger">Eliminar Cuenta</Button>
                        </Link>
                    </ListGroup.Item>}
            </ListGroup>
        </Card>
    )
}

export default UserCard