// File: /src/components/PasswordReset/ForgotPassword.js
import React, { useState } from 'react';
import { CognitoUserPool, CognitoUser } from 'amazon-cognito-identity-js';
import awsmobile from '../../aws-exports';
import './PasswordResetForm.css'; 
import Navbar from '../../components/Navbar/Navbar';

const PasswordResetForm = () => {
  // State variables:
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [resetStatus, setResetStatus] = useState(null);

  const { aws_user_pools_id: userPoolId, aws_user_pools_web_client_id: appClientId } = awsmobile;

  const poolData = {
    UserPoolId: userPoolId,
    ClientId: appClientId,
  };

  const userPool = new CognitoUserPool(poolData);

  const handlePasswordReset = (e) => {
    e.preventDefault();

    const cognitoUser = new CognitoUser({ Username: email, Pool: userPool });

    cognitoUser.confirmPassword(verificationCode, newPassword, {
      onSuccess: function () {
        console.log('Password reset successful!');
        setResetStatus('success');
      },
      onFailure: function (err) {
        console.error('Password reset failed:', err);
        setResetStatus('error');
      },
    });
  };

  return (
    <div className="password-reset-container">

      <h1>Reset Password</h1>

      <div className="password-reset-form-container">
        <form className="password-reset-form" onSubmit={handlePasswordReset}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <br />

          <label htmlFor="verificationCode">Verification Code:</label>
          <input
            type="text"
            id="verificationCode"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            required
          />
          
          <br />

          <label htmlFor="newPassword">New Password:</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          
          <br />

          <button type="submit">Reset Password</button>

          {resetStatus === 'success' && <p>Password reset successful!</p>}
          {resetStatus === 'error' && <p>Password reset failed. Please try again.</p>}
      
        </form>
      {/* "password-reset-form-container" div ends here */}
      </div>
    {/* "password-reset-container" div ends here */}
    </div> 
  );

}; // <--- PasswordResetForm() function ends here

export default PasswordResetForm;