// File: /src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
// Pages:
import Landing from './pages/Landing/Landing';
import Dashboard from './pages/Dashboard';
import TestPage from './pages/TestPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Landing/>} />
        <Route exact path='/dashboard' element={<Dashboard/>} />
        <Route exact path='/testpage' element={<TestPage/>} />
      </Routes>
    </Router>
  );
} // <--- App() function ends here

export default App;