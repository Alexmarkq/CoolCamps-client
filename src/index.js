import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import { RentProviderWrapper } from './contexts/rent.context'
import { AuthProviderWrapper } from './contexts/auth.context'
import { GoogleMapsProvider } from './contexts/maps.context'
import { Toaster } from 'react-hot-toast'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <GoogleMapsProvider>
    <AuthProviderWrapper>
      <RentProviderWrapper>
        <Router>
          <App />
          <Toaster position='bottom-right' reverseOrder={true} />
        </Router>
      </RentProviderWrapper>
    </AuthProviderWrapper>
  </GoogleMapsProvider>
)
