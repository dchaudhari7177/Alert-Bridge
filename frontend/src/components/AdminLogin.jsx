import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (email === 'vortexknights' && password === 'helloworld') {
      const isAdminLogin = await login(email, password, 'admin'); 
      
      if (isAdminLogin) {
        navigate('/admin-dashboard'); 
      } else {
        alert('Invalid admin credentials');
      }
    } else {
      alert('Invalid admin credentials'); 
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-cover bg-center" style={{ backgroundImage: `url('https://img.freepik.com/premium-photo/grainy-gradient-background-red-white-blue-colors-with-soft-faded-watercolor-border-texture_927344-24167.jpg?semt=ais_hybrid')` }}>
      <div className="w-full max-w-md p-8 bg-grey-200 rounded-lg shadow-lg transform transition-all duration-500 hover:scale-105">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Admin Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out transform hover:scale-105"
              required
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out transform hover:scale-105"
              required
            />
          </div>
          <button 
            type="submit" 
            className="w-full p-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-200 transform hover:scale-105">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
