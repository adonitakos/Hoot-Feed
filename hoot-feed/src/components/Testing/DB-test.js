import React, { useState } from 'react';
import { API } from 'aws-amplify'; 

const TestPage = () => {
  const [message, setMessage] = useState('');

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Save the message to DynamoDB
      await API.post('HootFeedToDynamoDB', '/messages', {
        body: { message },
      });

      // Clear the input field after successful submission
      setMessage('');
    } catch (error) {
      console.log('Error saving message:', error);
    }
  };

  return (
    <div>
      <h1>Test Page</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={message} onChange={handleMessageChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default TestPage;
