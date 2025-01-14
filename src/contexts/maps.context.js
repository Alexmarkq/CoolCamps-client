import { createContext, useContext } from 'react'
import { LoadScript } from '@react-google-maps/api'

const GoogleMapsContext = createContext()

export const useGoogleMaps = () => useContext(GoogleMapsContext)

const GoogleMapsProvider = ({ children }) => {
  return (
    <LoadScript googleMapsApiKey='AIzaSyDUeQXCyJDlhOtCB8JwWAk8zCxpjk6k-jo'>
      <GoogleMapsContext.Provider value={{}}>
        {children}
      </GoogleMapsContext.Provider>
    </LoadScript>
  )
}

export { GoogleMapsProvider }
