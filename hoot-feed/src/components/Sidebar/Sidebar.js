import React, { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import './Sidebar.css';
import HootForm from '../HootForm/HootForm';

function Sidebar() {
  const [user, setUser] = useState(null);
  const [showHootForm, setShowHootForm] = useState(false);

  const toggleHootForm = () => {
    setShowHootForm(!showHootForm);
  };

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

  if (!user) {
    // Render loading state or redirect to login page
    return <div>Loading...</div>;
  }

  return (
    <div className="sidebar">
      <div className="profile">
        <img src={user.picture} alt="Profile" className="profile-picture" />
        <h3>{user.preferred_username}</h3>
      </div>
      <ul className="sidebar-links">
        <li>
          <a href="/profile">Profile</a>
        </li>
        <li>
          <a href="/explore">Explore</a>
        </li>
      </ul>
      <button
        className={`hoot-button ${showHootForm ? 'active' : ''}`}
        onClick={toggleHootForm}
      >
        Hoot
      </button>
      <div className="blue-div">
      
      {showHootForm && (
      <div className="hoot-form-container">
        <HootForm />
      </div>
    )}
    </div>
      

    

      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
    </div>
  );
}

export default Sidebar;
