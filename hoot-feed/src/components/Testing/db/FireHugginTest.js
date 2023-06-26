import React, { useState, useEffect } from 'react';
import { firestore } from '../../../config/config-keys';
import { getDocs, collection } from 'firebase/firestore';
import { HUGGING_FACE_API_KEY } from '../../../config/config-keys';

async function query(data) {
  const response = await fetch(
    'https://api-inference.huggingface.co/models/facebook/bart-large-mnli',
    {
      headers: { Authorization: `Bearer ${HUGGING_FACE_API_KEY} ` },
      method: 'POST',
      body: JSON.stringify(data),
    }
  );
  const result = await response.json();
  return result;
}

function FireHugginTest() {
  const [responseData, setResponseData] = useState(null);
  const [hoots, setHoots] = useState([]);
  const [classifiers, setClassifiers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const classifiersRef = collection(firestore, 'classifiers');
      const hootsRef = collection(firestore, 'hoots');

      try {
        const classifiersData = await getDocs(classifiersRef);
        const classifiersFilteredData = classifiersData.docs.map((doc) => doc.data().class);
        setClassifiers(classifiersFilteredData);

        const hootsData = await getDocs(hootsRef);
        const hootsFilteredData = hootsData.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setHoots(hootsFilteredData);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchResponseData = async () => {
      try {
        const scoredHoots = [];

        for (let i = 0; i < hoots.length; i++) {
          const hoot = hoots[i];
          const response = await query({
            inputs: hoot.message,
            parameters: {
              candidate_labels: classifiers,
            },
          });
          scoredHoots.push({
            user: hoot.preferred_username,
            hoot: hoot.message,
            scores: response,
          });
        }

        setResponseData(scoredHoots);
      } catch (error) {
        console.error(error);
      }
    };

    if (hoots.length > 0 && classifiers.length > 0) {
      fetchResponseData();
    }
  }, [hoots, classifiers]);

  return (
    <>
      <h1>Firebase HuggingFace Test</h1>

      {responseData && (
        <div>
          <h2>Scored Hoots:</h2>
          <ul>
            {responseData.map((scoredHoot, index) => (
              <li key={index}>
                <h3>User: {scoredHoot.user}</h3>
                <p>Message: {scoredHoot.hoot}</p>
                <pre>{JSON.stringify(scoredHoot.scores, null, 2)}</pre>
              </li>
            ))}
          </ul>
        </div>
      )}
      {classifiers.map((data) => (+
        <h4>data</h4>
        ))}
    </>
  );
}

export default FireHugginTest;