import React, {useState, useEffect} from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/main.scss'

/* component's */

import Loading from './components/Loading'
import CreateTierForm from './components/CreateTierForm';
import TierListItself from './components/TierListItself';
import TierFormSearcher from './components/TierFormSearcher'

/* component's */

const App = () => {
  return (
  <>
  <div className='wrapper'>
  <div className='main-website'> 
    
  <Router>
    <Routes>
    <Route exact path="/" element={<Loading/>}/>
    <Route exact path='/znajdz-liste' element={<TierFormSearcher/>}/>
    <Route exact path="/stworz-tier-liste/:id" element={<CreateTierForm/>}/>
    <Route exact path="/tier-lista/:id" element={<TierListItself/>}/>
    </Routes>
  </Router>
  </div>
  </div>
  </>
  );
}

export default App;
