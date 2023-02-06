import { Link } from 'react-router-dom'
import './HomePage.css'


const linkStyle = {
    margin: "2rem",
    textDecoration: "none",
    color: 'white'
}

const HomePage = () => {

    return (
        <>
            <div className='hero' >
                <Link to="/lista" className='intro' style={linkStyle}>
                    <h1 className='title'>
                        <span className='span1'>Alquiler de campers</span>
                        <span className='span2'>entre particulares.</span>
                    </h1>
                </Link>
            </div>
        </>
    )
}

export default HomePage