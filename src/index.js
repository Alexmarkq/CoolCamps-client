import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import { BrowserRouter as Router } from 'react-router-dom'

import { RentProviderWrapper } from './contexts/rent.context'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(

  <React.StrictMode>
    <RentProviderWrapper>
      <Router>
        <App />
      </Router>
    </RentProviderWrapper>
  </React.StrictMode>

)