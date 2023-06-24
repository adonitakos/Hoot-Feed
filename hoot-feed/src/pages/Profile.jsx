// File: /src/pages/Profile.jsx
import React, { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await Auth.currentAuthenticatedUser();
        setUser(currentUser.attributes);
      } catch (error) {
        setUser(null);
        console.log('User fetch error:', error);
      }
    };

    fetchUser();
  }, []);

  if (user === null) {
    return <div>Loading...</div>;
  }

  const handleLogout = async () => {
    try {
      await Auth.signOut();
      console.log('Successful Logout');
      window.location.href = '/';
    } catch (error) {
      console.log('Logout error:', error);
      // Handle logout error
    }
  }; // <--- handleLogout() async function ends here

  return (
    <>
      <h1 style={{ textAlign: 'center', fontSize: '50px' }}>Profile</h1>
      <div className="profile">
        <img src={user.picture} alt="Profile" className="profile-picture" />
        <h3>{user.preferred_username}</h3>
        <h4>{user.email}</h4>
      </div>
      <br /> <br />
      <div className='buttons-container'>
        <button> <a href='/dashboard'> DASHBOARD </a> </button>
        <br/>
        <button onClick={handleLogout}> LOGOUT  </button>
      </div>

    <style>{`
        .buttons-container {
            display: grid;
            place-items: center;
        }

        button {
            background-color: #3d56f0;
            color: #ffffff;
            padding: 10px 20px;
            font-size: 16px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            display: grid;
            place-items: center;
        }

        a {
            text-decoration: none;
            color: white;
        }

    `}</style>

    </>
  );
}

export default Profile;