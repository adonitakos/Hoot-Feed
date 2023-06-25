// File: /src/pages/Profile.jsx
import React, { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import './Profile.css';
import Navbar from '../../components/Navbar/Navbar';

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
  };

  return (
    <>
      <Navbar></Navbar>
      <h1 className="profile-heading">Profile</h1>
      <div className="profile">
        <img src={user.picture} alt="Profile" className="profile-picture" />
        <h3 className="username">{user.preferred_username}</h3>
        <h4 className="email">{user.email}</h4>
        <div className="link-container">
          <a href="/edit-profile" className="profile-link">
            Edit Profile Picture
          </a>
          <br />
          <a href="/reset" className="profile-link">
            Reset Password
          </a>
        </div>
      </div>
      <div className="buttons-container">
        <button>
          <a href="/mainfeed">Dashboard</a>
        </button>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </>
  );
}

export default Profile;
