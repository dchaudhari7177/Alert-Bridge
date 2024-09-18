import React, { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext'; 
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password); 
      navigate('/'); 
    } catch (error) {
      console.error('Login Error:', error.message); }
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(to bottom right, #00bfff, #1e90ff, #8a2be2)',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '400px',
          padding: '32px',
          background: '#ffffff',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          border: '2px solid rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          transform: 'scale(1)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
          e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.2)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
        }}
      >
        <h2
          style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            color: '#333333',
            textAlign: 'center',
            marginBottom: '24px',
            animation: 'fadeIn 1s',
          }}
        >
          User Login
        </h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #cccccc',
                borderRadius: '4px',
                outline: 'none',
                boxSizing: 'border-box',
                fontSize: '1rem',
                color: '#333333',
                transition: 'border-color 0.2s ease',
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = '#1e90ff'}
              onBlur={(e) => e.currentTarget.style.borderColor = '#cccccc'}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #cccccc',
                borderRadius: '4px',
                outline: 'none',
                boxSizing: 'border-box',
                fontSize: '1rem',
                color: '#333333',
                transition: 'border-color 0.2s ease',
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = '#1e90ff'}
              onBlur={(e) => e.currentTarget.style.borderColor = '#cccccc'}
            />
          </div>
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px',
              background: '#1e90ff',
              color: '#ffffff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '1rem',
              transition: 'background-color 0.3s ease, transform 0.3s ease',
              transform: 'scale(1)',
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4682b4'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1e90ff'}
            onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
            onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
