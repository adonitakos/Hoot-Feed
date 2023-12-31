// File: /src/pages/Landing.jsx
import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import "../Landing/Landing.css"
import { Auth } from 'aws-amplify';
import TrendingWorld from '../../components/Trending/TrendingWorld';
import NavbarNoLogo from '../../components/Navbar/Navbar_NoLogo';

// Signup Form

function SignupForm() {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [picture, setPicture] = useState('');
  const [signupSuccess, setSignupSuccess] = useState(false);


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
      setDisplayName('');
      setEmail('');
      setPassword('');
      setPicture('');
      setSignupSuccess(true);
      // Handle successful signup
    } catch (error) {
      console.log('Signup error:', error);
      // Handle signup error
    }
  }; // <--- handleSignup() async function ends here

  return (
    <form onSubmit={handleSignup} className="signup-form">
      {signupSuccess && <p>Account successfully created!</p>}
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

} // <--- SignupForm() function ends here


// Welcome component
function Welcome() {
  return (
    <div className="welcome-section">
      <h2></h2>
      <p>Discover the latest buzz and trending topics with HootFeed.</p>
      <p>Stay updated with real-time feeds and engage with the community.</p>
      <p>Join the conversation, share your thoughts, and be a part of the HootFeed community.</p>
    </div>
  );
}



// Landing
function Landing() {
  
  return (
    <>
      <Navbar></Navbar>
      <div className='landing-wrapper'>
        <div className='landing-section'>
          <h2>Welcome to HootFeed!</h2>
          {/*Top tweets will go here */}
          <Welcome />
        </div>
        <div className='landing-section'>
          <h2>Trending</h2>
          <TrendingWorld />
        </div>
        <div className='landing-section'>
          <h2>Signup</h2>
          {/* Signup vibes */}
          <SignupForm />
        </div>
      </div>
    </>
  )
} // <--- Landing() function ends here

export default Landing;