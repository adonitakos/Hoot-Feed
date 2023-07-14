// File: /src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
// Pages:
import Landing from './pages/Landing/Landing';

import TestPage from './pages/TestPage';
import MainFeed from './pages/MainFeed';
import Profile from './pages/Profile/Profile';
import PrivateRoute from './components/Misc/PrivateRoute';
import InterestsPage from './pages/InterestsPage';
import PasswordReset from './pages/PasswordReset';
import DBTest from './components/Testing/DB-test';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Landing/>} />
       
        <Route exact path='/testpage' element={<TestPage/>} />
        <Route exact path='/mainfeed' element={<MainFeed/>} />
        <Route exact path='/profile' element={<Profile/>} />
        <Route exact path='/reset' element={<PasswordReset/>} />
        <Route exact path="/interestspage" element={<InterestsPage/>} />


        <Route exact path="/test" element={<DBTest/>} />


      </Routes>
    </Router>
  );
} // <--- App() function ends here

export default App;