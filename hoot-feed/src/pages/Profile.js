import React, { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
        const currentUser = await Auth.currentAuthenticatedUser();
        const { username, attributes } = currentUser;
        const { preferred_username: name, picture } = attributes;
        setUser({ username, name, picture });
    } catch (error) {
        console.error('Error loading user:', error);
    }
  };

  return (
    <div>
      {user ? (
        <div>
          <h1>Welcome, {user.name}</h1>
          <img src={user.picture} alt="Profile" />
        </div>
      ) : (
        <p>Loading user...</p>
      )}
    </div>
  );
}

export default Profile;
