import React, { useEffect, useState } from 'react';
import dotenv from 'dotenv'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Redirect from './components/Redirect';


dotenv.config()

function App() {
  return (
    <Router>
       
       <Routes>
        <Route path='/' element={<Redirect />} />
       </Routes>
    </Router>
  );
}

export default App;
