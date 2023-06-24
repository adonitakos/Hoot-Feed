import React, { useState, useEffect } from 'react';
import './HootForm.css';
import imageIcon from '../../Images/Image.png';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { createHoot } from '../../graphql/mutations';

function HootForm() {
  const [message, setMessage] = useState('');
  const [picture, setPicture] = useState(null);
  const [preferredUsername, setPreferredUsername] = useState('');

  useEffect(() => {
    // Retrieve the current authenticated user
    const fetchUser = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        setPreferredUsername(user.attributes.preferred_username);
      } catch (error) {
        console.error('Error fetching user', error);
      }
    };

    fetchUser();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const hoot = { message, picture, preferredUsername };

    try {
      await API.graphql(graphqlOperation(createHoot, { input: hoot }));
      setMessage('');
      setPicture(null);
      console.log('Hoot Sent');
    } catch (error) {
      console.error('Error adding hoot', JSON.stringify(error));
    }
  };

  const handlePictureInputChange = (e) => {
    const file = e.target.files[0];
    setPicture(file);
  }; 

  const handleTextAreaChange = (e) => {
    const value = e.target.value;
    if (value.length <= 300) {
      setMessage(value);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="hoot-form">
      <div className="form-container">
        <div className="form-box">
          <textarea
            value={message}
            onChange={handleTextAreaChange}
            placeholder="Enter your Hoot message..."
            required
          ></textarea>
          {picture && (
            <img
              src={URL.createObjectURL(picture)}
              alt="Selected Image"
              className="selected-image"
            />
          )}
          <label className="custom-input-button">
            <input
              type="file"
              accept="image/*"
              onChange={handlePictureInputChange}
            />
            <img src={imageIcon} alt="Select Image" className="image-icon" />
          </label>
          <div className="username-input">
            <label htmlFor="username">Username: </label>
            <input
              type="text"
              id="username"
              value={preferredUsername}
              disabled
            />
          </div>
          <div className="button-container">
            <button type="submit">Hoot</button>
          </div>
        </div>
      </div>
    </form>
  );
} // <--- HootForm() function ends here

export default HootForm;