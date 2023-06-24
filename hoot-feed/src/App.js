// File: /src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
// Pages:
import Landing from './pages/Landing/Landing';
import Dashboard from './pages/Dashboard';
import TestPage from './pages/TestPage';
import MainFeed from './pages/MainFeed';
import Profile from './pages/Profile';
import PrivateRoute from './components/Misc/PrivateRoute';
import DB_Testing from './components/Testing/DB_Testing';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Landing/>} />
        <Route exact path='/dashboard' element={<Dashboard/>} />
        <Route exact path='/testpage' element={<TestPage/>} />
        <Route exact path='/mainfeed' element={<MainFeed/>} />
        <Route exact path='/profile' element={<Profile/>} />
        <Route exact path='/test' element={<DB_Testing/>}/> {/*delete */}
      </Routes>
    </Router>
  );
} // <--- App() function ends here

export default App;