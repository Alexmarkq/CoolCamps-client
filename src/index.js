import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import { RentProviderWrapper } from './contexts/rent.context'
import { AuthProviderWrapper } from './contexts/auth.context'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(

  // <React.StrictMode>
  <AuthProviderWrapper>
    <RentProviderWrapper>
      <Router>
        <App />
      </Router>
    </RentProviderWrapper>
  </AuthProviderWrapper>
  // </React.StrictMode>

)