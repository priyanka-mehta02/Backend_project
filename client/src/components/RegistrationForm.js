import React, { useState } from 'react';
import axios from 'axios';
//registration form
const RegistrationForm = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    console.log(props);
    try {
      const response = await axios.post(`${process.env.REACT_APP_BE_URL}/api/auth/register`, { username, password });
     props.onRegistrationSuccess();
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default RegistrationForm;
