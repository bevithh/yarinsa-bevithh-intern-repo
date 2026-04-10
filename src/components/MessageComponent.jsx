import React, { useState } from 'react';

const MessageComponent = () => {
  const [message, setMessage] = useState('Hello, World!');

  return (
    <div>
      <h1>{message}</h1>
      <button onClick={() => setMessage('Button Clicked!')}>
        Update Message
      </button>
    </div>
  );
};

export default MessageComponent;