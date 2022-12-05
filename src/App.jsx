import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Navigation from './components/Navigation/Navigation'
import Footer from './components/Footer/Footer';
import AppRoutes from './routes/AppRoutes'
import { useState } from 'react';

const App = () => {

  return (
    <div className='App pb-5'>
      <Navigation />
      <AppRoutes />
      <Footer />
    </div>
  )
}

export default App;
