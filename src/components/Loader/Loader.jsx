import Spinner from 'react-bootstrap/Spinner'

function Loader() {

    return (
        <div class="d-flex justify-content-center">
            <Spinner animation="border text-secondary" role="status">
                <span class="visually-hidden">Cargando...</span>
            </Spinner>
        </div>
    )

}

export default Loader