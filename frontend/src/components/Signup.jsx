import React, { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext'; 
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup } = useContext(AuthContext); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(name, email, password);
      alert('Signup successful! Please check your email to verify your account.'); 
      navigate('/'); 
    } catch (error) {
      console.error('Signup Error:', error.message);
      alert(error.message); 
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-cover bg-center" style={{ backgroundImage: `url('https://img.freepik.com/premium-photo/grainy-gradient-background-red-white-blue-colors-with-soft-faded-watercolor-border-texture_927344-24167.jpg?semt=ais_hybrid')` }}>
      <div className="bg-grey-200 rounded-lg shadow-lg p-8 max-w-md w-full transition-transform duration-300 transform hover:scale-105">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Signup</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input 
            type="text" 
            placeholder="Name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
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
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
