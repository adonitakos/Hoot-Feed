import React from 'react';
import PasswordResetForm from '../components/PasswordReset/ForgotPassword';
import Navbar from '../components/Navbar/Navbar';


function PasswordReset() {
  return (
    <div> 
        <Navbar></Navbar>
        <PasswordResetForm />
    </div>
  )
}

export default PasswordReset