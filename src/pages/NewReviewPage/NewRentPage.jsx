import { Container } from "react-bootstrap"
import NewRentForm from "../../components/NewRentForm/NewRentForm"

const NewRentPage = () => {

    return (
        <Container>
            <h1>Alquila tu caravana!</h1>
            <hr />
            <NewRentForm />
        </Container>

    )
}

export default NewRentPage