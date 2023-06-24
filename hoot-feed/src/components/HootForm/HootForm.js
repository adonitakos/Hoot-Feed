// File: /src/components/HootForm/HootForm.js
import React, { useState, useEffect } from "react";
import './HootForm.css';
import imageIcon from '../../Images/Image.png';
import { firestore } from "../../config/config-keys";
import { getDocs, collection, addDoc } from 'firebase/firestore';
import { Auth } from 'aws-amplify';

function HootForm() {
  
  const [preferredUsername, setPreferredUsername] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [message, setMessage] = useState('');
  const [attachment, setAttachment] = useState('');

  // Retrieve the current authenticated user's Preferred Username and Profile Picture
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        setPreferredUsername(user.attributes.preferred_username);
        setProfilePic(user.attributes.picture);
      } catch (error) {
        console.error('Error fetching user', error);
      }
    }; // <--- fetchUser() function ends here
    fetchUser();
  }, []); // <--- useEffect() ends here

  // Handle submission of data
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(firestore, "hoots"), {
        preferred_username: preferredUsername,
        profile_pic: profilePic,
        message: message,
        attachment: attachment,
        date: new Date()
      });
      console.log("Document written with ID: ", docRef.id);
      // Clear form inputs
      setPreferredUsername("");
      setMessage("");
      setAttachment("");
    } catch (err) {
      console.error("Error adding document: ", err);
    }
  }; // <--- handleSubmit() function ends here

  // Literally just to handle resizing the textarea (for the message)
  const handleTextAreaChange = (e) => {
    const value = e.target.value;
    if (value.length <= 300) {
      setMessage(value);
    }
  }; // <--- handleTextAreaChange() function ends here

  const handleAttachmentInputChange = (e) => {
    const value = e.target.value;
    setAttachment(value);
  };

  return (
    <form onSubmit={handleSubmit} className="hoot-form">
      <div className="form-container">
        <div className="form-box">
          {/* Message */}
          <textarea
            value={message}
            onChange={handleTextAreaChange}
            placeholder="Enter your Hoot message..."
            required
          ></textarea>
          <input
            type="text"
            className="selectedImage"
            placeholder="Paste a URL to an image you want to attach..."
            value={attachment}
            onChange={handleAttachmentInputChange}
            />

          <span>
          {/* <img src={imageIcon} alt="Select Image" className="image-icon" /> */}
          </span>

          <div className="button-container">
            <button type="submit">Hoot!</button>
          </div>
 
          
        </div>
      </div>

    </form>
  )
} // <--- HootForm() function ends here

export default HootForm;