import { Link } from 'react-router-dom'

import './HomePage.css'

const linkStyle = {
    margin: "2rem",
    textDecoration: "none",
    color: 'white'

};

const HomePage = () => {

    return (
        <>

            <section className='hero' >

                <Link to="/lista" style={linkStyle}>
                    <h1 className='welcome'>


                        Vive<br />la<br /> naturaleza</h1>
                </Link>

            </section>


        </>

    )
}

export default HomePage