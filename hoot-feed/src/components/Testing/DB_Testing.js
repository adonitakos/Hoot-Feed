import React, { useEffect, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { listHoots } from '../../graphql/queries';

function DB_Testing() {
  const [hoots, setHoots] = useState([]);

  useEffect(() => {
    fetchHoots();
  }, []);

  const fetchHoots = async () => {
    try {
      const { data } = await API.graphql(graphqlOperation(listHoots));
      const hootsData = data.listHoots.items;
      const filteredHoots = hootsData.filter((hoot) => hoot.hoot_id === "1"); // Modify the filtering condition here
      setHoots(filteredHoots);
    } catch (error) {
      console.error('Error fetching hoots', error);
    }
  };
  
  

  return (
    <div>
      <h1>Hoots</h1>
      {hoots.map((hoot) => (
        <div key={hoot.id}>
          <p>Message: {hoot.message}</p>
          <p>Picture: {hoot.picture}</p>
          <p>Username: {hoot.preferredUsername}</p>
          <p>Created At: {hoot.createdAt}</p>
          <p>Updated At: {hoot.updatedAt}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default DB_Testing;
