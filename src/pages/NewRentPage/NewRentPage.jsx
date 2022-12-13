import { Container } from "react-bootstrap"
import NewReviewForm from "../../components/NewReviewForm/NewReviewForm"



const NewReviewPage = () => {

    return (
        <Container>
            <h1>Comentarios</h1>
            <hr />
            <NewReviewForm />
        </Container>

    )
}

export default NewReviewPage