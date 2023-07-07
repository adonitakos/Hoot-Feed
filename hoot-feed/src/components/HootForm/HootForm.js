// File: /src/components/HootForm/HootForm.js
import React, { useState, useEffect } from "react";
import "./HootForm.css";
import imageIcon from "../../Images/Image.png";
import { firestore } from "../../config/config-keys";
import { getDocs, collection, addDoc } from "firebase/firestore";
import { Auth } from "aws-amplify";
import { HUGGING_FACE_API_KEY } from "../../config/config-keys";

async function query(data) {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/MoritzLaurer/DeBERTa-v3-base-mnli-fever-anli",
    {
      headers: { Authorization: `Bearer ${HUGGING_FACE_API_KEY} ` },
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  const result = await response.json();
  return result;
} // <--- query() async function ends here

function HootForm() {
  const [preferredUsername, setPreferredUsername] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [message, setMessage] = useState("");
  const [attachment, setAttachment] = useState("");

  // Retrieve the current authenticated user's Preferred Username and Profile Picture
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        setPreferredUsername(user.attributes.preferred_username);
        setProfilePic(user.attributes.picture);
      } catch (error) {
        console.error("Error fetching user", error);
      }
    }; // <--- fetchUser() function ends here
    fetchUser();
  }, []); // <--- useEffect() ends here

  // Handle submission of data
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await query({
        inputs: message,
        parameters: {
          candidate_labels: [
            "Business & Economics",
            "Entertainment",
            "Food",
            "Music",
            "Science",
            "Sports",
            "Technology & Computing",
            "Travel",
          ],
        },
      }); // <--- response() ends here

      const { scores, labels } = response;

      const maxScoreIndex = scores.indexOf(Math.max(...scores));
      const classification = labels[maxScoreIndex];

      const docRef = await addDoc(collection(firestore, "hoots"), {
        preferred_username: preferredUsername,
        profile_pic: profilePic,
        message: message,
        attachment: attachment,
        date: new Date(),
        class: classification,
      }); // <--- docRef ends here

      console.log("Document written with ID: ", docRef.id);
      setPreferredUsername("");
      setMessage("");
      setAttachment("");
    } catch (err) {
      console.error("Error adding document: ", err);
    }
  }; // <--- handleSubmission() async function ends here
  
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
  }; // <--- handleAttachmentInputChange() function ends here

  return (
    <form onSubmit={handleSubmit} className="hoot-form" style={{zoom:'110%'}}>
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
          {/* Image preview */}
          {attachment && (
            <div className="image-preview">
              <img src={attachment} alt="Selected Image" />
            </div>
          )}

          <div className="button-container">
            <button type="submit">Hoot!</button>
          </div>
        </div>
      </div>
    </form>
  ); // <--- return(<></>) ends here

} // <--- HootForm() function ends here

export default HootForm;