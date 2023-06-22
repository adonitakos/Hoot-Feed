// File: /src/pages/TestPage.jsx
// PURELY FOR TESTING!!!!!! (in conjunction with Testing components)
import React from 'react';
import API_Testing from '../components/Testing/API_Testing';
import HootsFeed from '../components/Testing/HootsFeed';


function TestPage() {
  return (
  <>
   <HootsFeed />
   <br /> <br /> <br />
   <API_Testing />
  </>
  ) 
} // <--- TestPage() function ends here

export default TestPage;