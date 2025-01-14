import Spinner from 'react-bootstrap/Spinner'

function Loader() {
  return (
    <div className='d-flex justify-content-center'>
      <Spinner animation='border text-secondary' role='status'>
        <span className='visually-hidden'>Cargando...</span>
      </Spinner>
    </div>
  )
}

export default Loader
