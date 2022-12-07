import { useContext } from 'react';
import { AuthContext } from '../../contexts/auth.context'
import { Card, ListGroup, Container } from 'react-bootstrap';


const ProfilePage = () => {

    const { user } = useContext(AuthContext)

    const { username, email, profileImg } = user
    console.log(user)
    return (
        <>
            <Container>

                <Card className='mt-5' style={{ width: '25rem' }}>
                    <Card.Img variant="top" src={profileImg} />
                    <Card.Body>
                        <Card.Title>{username}</Card.Title>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item>{email}</ListGroup.Item>
                    </ListGroup>
                </Card>

            </Container>
        </>
    )

}


export default ProfilePage