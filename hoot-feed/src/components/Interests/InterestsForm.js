// File: /src/components/Interests/InterestsForm.js

import React, { useState, useEffect } from 'react';
import './Interests.css';
import { Auth } from 'aws-amplify';
import { firestore } from "../../config/config-keys";
import { getDocs, collection, addDoc } from 'firebase/firestore';

function InterestsForm() {

  // classifiers
  const [classifiers, setClassifiers] = useState([]);

  // users
  const [email, setEmail] = useState('');
  const [preferredUsername, setPreferredUsername] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [interests, setInterests] = useState([]);

  // Retrieve the current authenticated user's information
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        setEmail(user.attributes.email);
        setPreferredUsername(user.attributes.preferred_username);
        setProfilePic(user.attributes.picture);
      } catch (error) {
        console.error('Error fetching user', error);
      }
    }; // <--- fetchUser() function ends here
    fetchUser();
  }, []); // <--- useEffect() ends here

  // Retrieve all the classifiers from classifiers collection
  useEffect(() => {
    const fetchData = async () => {
      const listRef = collection(firestore, "classifiers");
      try {
        const data = await getDocs(listRef)
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id
        }))
        setClassifiers(filteredData)
      } catch (err) {
        console.log(err);
      }
    }; // <--- fetchData() async function ends here
    fetchData();
  }, []);

  // Handle submission of data to users collection
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const docRef = await addDoc(collection(firestore, "users"), {
        email: email,
        preferred_username: preferredUsername,
        profile_pic: profilePic,
        interests: interests
      });
      console.log("Document written with ID: ", docRef.id);
      window.location.href = '/mainfeed'; // Redirect after successful submission
    } catch (err) {
      console.error("Error adding document: ", err);
    }
  }; // <--- handleSubmit() async function ends here
  
  // Handle changes in checkbox selection
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setInterests((prevInterests) => [...prevInterests, value]);
    } else {
      setInterests((prevInterests) =>
        prevInterests.filter((interest) => interest !== value)
      );
    }
  };

  return (
    <>
    <form onSubmit={handleSubmit} className="interests-form">
      <div className="classifiers-container">
        {classifiers.map((data) => (
          <div key={data.id} className="customCheckBoxHolder">
            <input
              className="customCheckBoxInput"
              id={data.id}
              type="checkbox"
              value={data.id} // or value={data.class}
              onChange={handleCheckboxChange}
            />
            <label className="customCheckBoxWrapper" htmlFor={data.id}>
              <div className="customCheckBox">
                <div className="inner">{data.class}</div>
              </div>
            </label>
          </div>
        ))}
      </div>
      <div className="button-container">
        <button className="submit-button" type="submit">
          Submit
        </button>
      </div>
    </form>
    </>
  ); // <--- return() ends here

} // <--- InterestsForm() function ends here

export default InterestsForm;