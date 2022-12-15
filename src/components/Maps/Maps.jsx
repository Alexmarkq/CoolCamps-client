import React from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import { Col, Row } from 'react-bootstrap';


const containerStyle = {
    width: "100vw",
    height: "60vh",
};


const Maps = ({ lat, lng, locations }) => {
    let center = { lat: 0, lng: 0 }
    if (lat && lng) {
        center = {
            lat,
            lng
        }
    }

    return (
        <LoadScript
            googleMapsApiKey="AIzaSyDUeQXCyJDlhOtCB8JwWAk8zCxpjk6k-jo" >
            <Row id="map2" className='px-3'>
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={12}
                >
                    {locations
                        ?
                        locations.map((el, idx) => {
                            return (<Marker key={idx}
                                position={{

                                    lat: el.location.coordinates[0],
                                    lng: el.location.coordinates[1]
                                }} />)
                        })
                        :
                        <Marker key="marker_1"
                            position={{
                                lat,
                                lng
                            }} />}

                </GoogleMap>
            </Row>
        </LoadScript>
    )
}

export default React.memo(Maps)