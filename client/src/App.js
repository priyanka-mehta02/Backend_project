
import React, { useState } from 'react';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
//Testing app

function App() {
  const [registered, setRegistered] = useState(false);

  const handleRegistrationSuccess = () => {
    // Update the state to indicate that the user is registered
    setRegistered(true);
  };

  return (
    // it will check if register then it go to login
    <div className="App">
      <h1>{registered ? 'Login' : 'Registration'}</h1>
      {registered ? (
        <LoginForm />
      ) : (
        <RegistrationForm onRegistrationSuccess={handleRegistrationSuccess} />
      )}
    </div>
  );
}

export default App;


