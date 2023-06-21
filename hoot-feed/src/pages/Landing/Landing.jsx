// File: /src/pages/Landing.jsx
import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import "../Landing/Landing.css"
import { Auth } from 'aws-amplify';

//Signup Form

function SignupForm() {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [picture, setPicture] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const signUpResponse = await Auth.signUp({
        username: email, // Use email as the username for signup
        password,
        attributes: {
          email,
          preferred_username: displayName,
          picture,
        },
      });
      console.log('Signup successful:', signUpResponse);
      // Handle successful signup
    } catch (error) {
      console.log('Signup error:', error);
      // Handle signup error
    }
  };

  return (
    <form onSubmit={handleSignup} className="signup-form">
      <input
        type="text"
        placeholder="Display Name"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Profile Picture URL"
        value={picture}
        onChange={(e) => setPicture(e.target.value)}
      />
      <button type="submit">JOIN HOOT FEED</button>
    </form>
  );
}


//Landing
function Landing() {


  return (
    <>
      <Navbar></Navbar>
      <div className='landing-wrapper'>
        <div className='landing-section'>
          <h2>What's Happening Now</h2>
          {/*Top tweets will go here */}
        </div>
        <div className='landing-section'>
          <h2>Trending</h2>
          {/*Trending List will go here*/}
        </div>
        <div className='landing-section'>
          <h2>Signup</h2>
          {/*Signup vibes */}
          <SignupForm />
        </div>
      </div>
     
      <h1>Landing page</h1>
    </>
  )
} // <--- Landing() function ends here

export default Landing;