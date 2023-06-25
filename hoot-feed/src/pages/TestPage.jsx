// File: /src/pages/TestPage.jsx
// PURELY FOR TESTING!!!!!! (in conjunction with Testing components)
import React from 'react';
import API_Testing from '../components/Testing/API_Testing';
import HootsFeed from '../components/Testing/HootsFeed';
import DB_Testing from '../components/Testing/DB_Testing';
import InterestsForm from '../components/Interests/InterestsForm';

function TestPage() {
  return (
  <>
    <h1 style={{textAlign:'center', fontSize:'60px'}}>
      ! EVERYTHING HERE IS JUST FOR TESTING PURPOSES !
    </h1>
    <hr />

    {/* <HootsFeed />
    <br /> <br /> <br />
    <API_Testing />
    <br /> <br /> <br />
    <DB_Testing /> */}
    {/* <InterestsForm/> */}

  </>
  );
} // <--- TestPage() function ends here

export default TestPage;