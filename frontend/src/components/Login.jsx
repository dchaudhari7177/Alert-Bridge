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
      const userData = await login(email, password); 
      console.log('User data:', userData); 
      
      if (userData) {
        navigate('/'); 
      } else {
        alert('Your account is not verified. Please check your email for the verification link.'); 
      }
    } catch (error) {
      alert(error.message); 
      console.error('Login Error:', error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-cover bg-center" style={{ backgroundImage: `url('https://img.freepik.com/premium-photo/grainy-gradient-background-red-white-blue-colors-with-soft-faded-watercolor-border-texture_927344-24167.jpg?semt=ais_hybrid')` }}>
      <div className="bg-grey-200 rounded-lg shadow-lg p-8 max-w-md w-full transition-transform duration-300 transform hover:scale-105">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">User Login</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
          <button 
            type="submit" 
            className="bg-indigo-600 text-white font-semibold py-3 rounded-lg transition-transform duration-300 transform hover:bg-indigo-700 hover:scale-105"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
