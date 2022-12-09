import React from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'


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
                zoom={12}
            >
                <Marker key="marker_1"

                    position={{

                        lat,

                        lng

                    }} />
                <></>
            </GoogleMap>
        </LoadScript>
    )
}

export default React.memo(Maps)