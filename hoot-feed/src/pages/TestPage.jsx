// File: /src/pages/TestPage.jsx
// PURELY FOR TESTING!!!!!! (in conjunction with Testing components)
import React from 'react';
import API_Testing from '../components/Testing/API_Testing';
import HootsFeed from '../components/Testing/HootsFeed';
import DB_Testing from '../components/Testing/DB_Testing';

function TestPage() {
  return (
  <>
   <HootsFeed />
   <br /> <br /> <br />
   <API_Testing />
   <br /> <br /> <br />
   <DB_Testing />
  </>
  ) 
} // <--- TestPage() function ends here

export default TestPage;