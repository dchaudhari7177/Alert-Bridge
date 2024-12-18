import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import quotesData from './quotes.json';
import { FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';
import './Home.css'; 

const Home = () => {
  const { isLogin, logout, userRole, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [randomQuotes, setRandomQuotes] = useState([]);

  useEffect(() => {
    const shuffledQuotes = quotesData.sort(() => 0.5 - Math.random());
    setRandomQuotes(shuffledQuotes.slice(0, 4));
  }, []);

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  const handleAdminLogin = () => {
    navigate('/admin-login');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleDashboard = () => {
    if (userRole === 'admin') {
      navigate('/admin-dashboard');
    } else {
      navigate('/dashboard');
    }
  };

  const handleImportantContact = () => {
    navigate('/important-contact');
  };

  const handleNewsRedirect = () => {
    navigate('/news');
  };
   const handleAboutRedirect = () => {
    navigate('/about');
  };

  return (
    <div className="home-container flex flex-col min-h-screen bg-gradient-to-b from-blue-500 to-teal-400 relative overflow-hidden">
      <div className="animated-background"></div>
      
      <header className="flex justify-between items-center p-4 bg-[#0077B6] text-white shadow-md fixed w-full z-10">
        <h1 className="text-3xl font-bold transition-transform duration-300 transform hover:scale-105">Welcome to Our App</h1>
        <div className="flex gap-4">
          {isLogin ? (
            <>
              <button onClick={handleLogout} className="bg-[#FF6F61] px-4 py-2 rounded shadow-md transition-transform duration-300 transform hover:scale-105">Logout</button>
              <button onClick={handleDashboard} className="bg-[#5A67D8] px-4 py-2 rounded shadow-md transition-transform duration-300 transform hover:scale-105">
                {userRole === 'admin' ? 'Admin Dashboard' : 'Dashboard'}
              </button>
              <button onClick={handleImportantContact} className="bg-[#28A745] px-4 py-2 rounded shadow-md transition-transform duration-300 transform hover:scale-105">Important Contact</button>
              <button onClick={handleNewsRedirect} className="bg-[#F39C12] px-4 py-2 rounded shadow-md transition-transform duration-300 transform hover:scale-105">News</button>
              <button onClick={handleAboutRedirect} className="bg-[#F32A77] px-4 py-2 rounded shadow-md transition-transform duration-300 transform hover:scale-105">About us</button>

            </>
          ) : (
            <div className="flex gap-2">
              <button onClick={handleLogin} className="bg-[#FF6F61] px-4 py-2 rounded shadow-md transition-transform duration-300 transform hover:scale-105">Login</button>
              <button onClick={handleSignup} className="bg-[#17A2B8] px-4 py-2 rounded shadow-md transition-transform duration-300 transform hover:scale-105">Signup</button>
              <button onClick={handleAdminLogin} className="bg-[#FFC107] px-4 py-2 rounded shadow-md transition-transform duration-300 transform hover:scale-105">Admin Login</button>
            </div>
          )}
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center p-4 pt-20">
        <section className="bg-white shadow-lg rounded-lg p-8 w-full md:w-3/4 lg:w-2/3 mb-8 animate-fadeIn transition-transform duration-300 hover:scale-105">
          <h2 className="text-3xl text-[#0077B6] font-extrabold mb-6 border-b-2 border-[#0077B6] pb-2">
            About Our Website
          </h2>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Our platform is designed to provide users with a smooth and interactive experience.
            We offer real-time data, personalized dashboards, and a wide range of features to
            help you stay informed and connected. From monitoring weather conditions to accessing
            the latest updates, our app is your one-stop solution for all your needs.
          </p>
          <ul className="list-disc list-inside text-lg text-[#0077B6] mb-6 space-y-2">
            <li className="hover:text-blue-700 transition duration-300">Real-time weather updates and forecasts</li>
            <li className="hover:text-blue-700 transition duration-300">Personalized user and admin dashboards</li>
            <li className="hover:text-blue-700 transition duration-300">Advanced analytics and reporting</li>
            <li className="hover:text-blue-700 transition duration-300">Responsive design for seamless access across devices</li>
          </ul>
        </section>






        <section className="bg-[#0077B6] text-white rounded-lg p-6 w-full md:w-3/4 lg:w-2/3 mb-4 animate-fadeInRight">
{isLogin ? (
  <p className="text-xl text-center">Welcome back, {user?.name || 'User'}! Explore your dashboard!</p>
) : (
  <p className="text-lg text-center mb-4">Please log in or sign up to get started.</p>
)}
</section>
<h2 className="text-4xl font-bold text-center text-gray-800 my-8 relative">
<span className="relative inline-block">
<span className="relative text-gray-800">Quotes</span>
</span>
<span className="block h-1 w-32 bg-blue-500 rounded mt-4 mx-auto"></span>
</h2>
<section className="w-full md:w-3/4 lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 mb-4">
{randomQuotes.map((quote, index) => (
  <div key={index} className="bg-white shadow-lg rounded-lg p-4 transition-transform duration-300 transform hover:scale-105">
    <p className="text-lg italic text-gray-700">"{quote.content}"</p>
    <p className="text-right text-gray-500">- {quote.author}</p>
  </div>
))}
</section>

</main>
<footer className="bg-[#0077B6] text-white p-4 text-center">
<p>© {new Date().getFullYear()} Vortex Knights. All rights reserved.</p>
</footer>
</div>

  );
};

export default Home;








