// File: /src/pages/Dashboard.jsx
import React from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import Feed from '../components/Feed/Feed';

function MainFeed() {
  return (
    <>
    <div className='sidebar'>
        <Sidebar />
    </div>
    <div className='feed'>
        <h1>MainFeed page</h1>
        <br></br>
        <Feed />
    </div>
    </>
  )
} // <--- MainFeed() function ends here


export default MainFeed;