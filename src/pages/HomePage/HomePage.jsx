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

            <section className='hero' >

                <Link to="/lista" className='intro' style={linkStyle}>
                    <h2 className='rent'>
                        Alquiler de autocaravanas</h2>

                    <h3 className='rent2'>entre particulares.</h3>
                </Link>

            </section>


        </>

    )
}

export default HomePage