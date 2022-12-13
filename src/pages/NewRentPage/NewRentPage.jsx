import { Container } from "react-bootstrap"
import { useParams } from "react-router-dom"
import NewReviewForm from "../../components/NewReviewForm/NewReviewForm"



const NewReviewPage = () => {
    const { rent_id } = useParams()
    return (
        <Container>
            <h1>Comentarios</h1>
            <hr />
            <NewReviewForm id={rent_id} />
        </Container>

    )
}

export default NewReviewPage