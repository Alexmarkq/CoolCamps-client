import React from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api'


const containerStyle = {
    width: '300px',
    height: '400px'
};


function Maps({ lat, lng }) {


    const center = {
        lat,
        lng
    }

    return (
        <LoadScript
            googleMapsApiKey="AIzaSyDUeQXCyJDlhOtCB8JwWAk8zCxpjk6k-jo"
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={15}
            >
                { /* Child components, such as markers, info windows, etc. */}
                <></>
            </GoogleMap>
        </LoadScript>
    )
}

export default React.memo(Maps)