import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Sidebar from './components/Sidebar'

import Home from './pages/Home';
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import Log from './pages/Log';
import Stocks from './pages/Stocks';


const App: React.FunctionComponent = () => {
  return (
    <>
      <Router>
        <Sidebar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/team' element={<Profile />} />            
          <Route path='/tasks' element={<Orders />} />    
          <Route path='/chats' element={<Log />} />
          <Route path='/analytics' element={<Stocks />} />
        </Routes>
      </Router> 
    </>
  )
}

export default App
