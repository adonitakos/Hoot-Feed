// File: /src/components/Feed/Feed.js
import React, { useState, useEffect } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { firestore } from "../../config/config-keys";
import Navbar from '../Navbar/Navbar';
import NavbarNoLogo from '../Navbar/Navbar_NoLogo';
import './Feed.css'

function Feed() {

  const [hootsData, setHootsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const listRef = collection(firestore, "hoots");
      try {
        const data = await getDocs(listRef)
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id
        }))
        setHootsData(filteredData)
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {hootsData && (
        <div>
          
          {hootsData.map((hoot, index) => (
            <li key={index} style={{ listStyleType: 'none' }}>
              <div className={hoot.attachment ? 'card with-image' : 'card'}>
                <div className="card__content">
                  <div className="card__header">
                    <img className="user-image" src={hoot.profile_pic} alt="User" />
                    <h4 className="hoot-user">{hoot.preferred_username}</h4>
                  </div>
                  <p className="hoot-message">{hoot.message}</p>
                  {hoot.attachment && (
                    <div className="attachment-container">
                      <img 
                        className="attachment-img" src={hoot.attachment} />
                    </div>
                  )}
                  <div className="date-time-container">
                    <h6 className="date-time">{new Date(hoot.date.seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {new Date(hoot.date.seconds * 1000).toLocaleDateString()}</h6>
                  </div>
                </div>
              </div>
              <br />
            </li>
          ))}
        </div>
      )}
    </>
  );
} // <--- Feed() function ends here

export default Feed;