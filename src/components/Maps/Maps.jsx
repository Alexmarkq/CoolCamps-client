import React from 'react'
import { GoogleMap, Marker } from '@react-google-maps/api'
import { Row } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import './Maps.css'

const containerStyle = {
  width: '100vw',
  height: '60vh',
  borderRadius: '10px',
}

const Maps = ({ lat, lng, locations, selectable = false, onMapClick }) => {
  const [markerPosition, setMarkerPosition] = useState({ lat, lng })
  const [mapCenter, setMapCenter] = useState({ lat, lng })

  useEffect(() => {
    if (locations && locations.length > 0) {
      const newLat = locations[0].location.coordinates[0]
      const newLng = locations[0].location.coordinates[1]
      setMapCenter({ lat: newLat, lng: newLng })
      setMarkerPosition({ lat: newLat, lng: newLng })
    }
  }, [locations])

  const handleMapClick = (e) => {
    if (!selectable) return
    const newLat = e.latLng.lat()
    const newLng = e.latLng.lng()
    setMarkerPosition({ lat: newLat, lng: newLng })
    if (onMapClick) {
      onMapClick({ lat: newLat, lng: newLng })
    }
  }

  return (
    <Row id='map2' className='px-3 extra-padding'>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={mapCenter}
        zoom={12}
        onClick={handleMapClick}
      >
        {locations ? (
          locations.map((el, idx) => {
            return (
              <Marker
                key={idx}
                position={{
                  lat: el.location.coordinates[0],
                  lng: el.location.coordinates[1],
                }}
              />
            )
          })
        ) : (
          <Marker position={markerPosition} />
        )}
      </GoogleMap>
    </Row>
  )
}

export default React.memo(Maps)
