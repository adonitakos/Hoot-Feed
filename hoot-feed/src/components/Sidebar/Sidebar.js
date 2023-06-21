import React, { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import "./Sidebar.css"

function Sidebar() {
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

  const handleLogout = async () => {
    try {
      await Auth.signOut();
      console.log("Successful Logout");
      // Handle successful logout or navigate to the login page
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
      
      <button className="hoot-button">Hoot</button>
      <div></div>
      <button onClick={handleLogout} className="logout-button">Logout</button>
    </div>
  );
}

export default Sidebar;
