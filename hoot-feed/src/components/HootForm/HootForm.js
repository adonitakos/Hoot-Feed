import React, { useState } from 'react';
import './HootForm.css';
import imageIcon from '../../Images/Image.png'; // Replace with your desired image icon

function HootForm() {
  const [message, setMessage] = useState('');
  const [picture, setPicture] = useState(null);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission here
    // Send to Dynamo DB
  };

  const handlePictureInputChange = (e) => {
    const file = e.target.files[0];
    setPicture(file);
  };

  const handleTextAreaChange = (e) => {
    const value = e.target.value;
    if (value.length <= 300) { {/*Character limit */}
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
          <div className="button-container">
            <button type="submit">Hoot</button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default HootForm;
