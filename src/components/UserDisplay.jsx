import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserDisplay = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users/1')
      .then(response => setUser(response.data.name))
      .catch(() => setError('Failed to fetch user'));
  }, []);

  if (error) return <div>{error}</div>;
  if (!user) return <div>Loading...</div>;

  return <h1>{user}</h1>;
};

export default UserDisplay;