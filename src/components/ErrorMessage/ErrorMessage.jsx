import Alert from 'react-bootstrap/Alert';

function ErrorMessage({ children }) {
    return (
        <Alert variant={'warning'}>
            {children}
        </Alert>
    )
}


export default ErrorMessage