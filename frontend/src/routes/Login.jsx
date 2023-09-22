import React, { useState } from 'react';
import './styles/Login.css'; // Import your CSS file

const Login= () => {
  const [email, setEmail] = useState(''); // Change 'setemail' to 'setEmail'
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Here, you can implement your login logic (e.g., sending a request to a server).
    console.log('Email:', email); // Change 'email' to 'Email'
    console.log('Password:', password);
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email" // Change 'username' to 'email'
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Change 'setUsername' to 'setEmail'
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
