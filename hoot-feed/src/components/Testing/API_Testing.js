// File: /src/Testing/API_Testing.js
// THIS IS ONLY FOR TESTING!!!!!!

import React, { useState, useEffect } from 'react';
import { HUGGING_FACE_API_KEY } from '../../config';

// Use fetch POST request asyncronously to gain access to bart-large-mnli model
// and query a given data parameter(this being an input like a hoot)
async function query(data) {
    const response = await fetch(
      'https://api-inference.huggingface.co/models/facebook/bart-large-mnli',
      {
        headers: { Authorization: `Bearer ${HUGGING_FACE_API_KEY} `},
        method: 'POST',
        body: JSON.stringify(data),
      }
    );
    const result = await response.json();
    return result;
} // <--- query async function ends here

function API_Testing() {
  // State Variables for response data 
  const [responseData, setResponseData] = useState(null);

  // useEffect to obtain data from JSON file and pass it through HuggingFace query function
  useEffect(() => {
    async function fetchData() {
      try {
        const testData = require('./test_data.json'); // read JSON file
        const feed = testData.feed; // store testData.feed object in local hoots array
        const scoredHoots = []; // initialize array for feed that will be scored from each query result

        for (let i = 0; i < feed.length; i++) { // loop through whole feed
          const hoot = feed[i]; // just shorthanding, really anything that says hoot can just be hoots[i]
          const response = await query({
            "inputs": hoot.hoot,
            "parameters": {
              "candidate_labels": ["Music", "Economics", "Sports"]
            }
          });
          scoredHoots.push({
            user: hoot.user,
            hoot: hoot.hoot,
            scores: response
          });
        } // <--- for() loop ends here
        setResponseData(scoredHoots);
      } catch (error) {
        console.error(error);
      }
    } // <--- fetchData() async function ends here
    fetchData();
  }, []); // <--- useEffect() ends here

    return (
      <>
      <h1>TEST PAGE</h1>
      {responseData && (
        <div>
          <h2>Scored Hoots:</h2>
          <ul>
            {responseData.map((scoredHoot, index) => (
              <li key={index}>
                <h3>User: {scoredHoot.user}</h3>
                <p>Hoot: {scoredHoot.hoot}</p>
                <pre>{JSON.stringify(scoredHoot.scores, null, 2)}</pre>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
    );
} // <--- API_Testing() function ends here

export default API_Testing;