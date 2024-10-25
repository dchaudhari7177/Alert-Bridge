import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Home = () => {
  const { isLogin, logout, userRole, user } = useContext(AuthContext);
  const navigate = useNavigate();

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

  return (
    <div className="flex flex-col min-h-screen bg-[#F0F8FF]">
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
        <section className="bg-white shadow-lg rounded-lg p-6 w-full md:w-3/4 lg:w-2/3 mb-4 animate-fadeIn">
          <h2 className="text-2xl text-[#0077B6] font-bold mb-4">About Our Website</h2>
          <p className="text-lg text-gray-700 mb-4">
            Our platform is designed to provide users with a smooth and interactive experience. 
            We offer real-time data, personalized dashboards, and a wide range of features 
            to help you stay informed and connected. From monitoring weather conditions to accessing 
            the latest updates, our app is your one-stop solution for all your needs.
          </p>
          <ul className="list-disc list-inside text-lg text-[#0077B6] mb-4">
            <li>Real-time weather updates and forecasts</li>
            <li>Personalized user and admin dashboards</li>
            <li>Advanced analytics and reporting</li>
            <li>Responsive design for seamless access across devices</li>
          </ul>
        </section>

        <section className="bg-[#0077B6] text-white rounded-lg p-6 w-full md:w-3/4 lg:w-2/3 animate-fadeInRight">
          {isLogin ? (
            <p className="text-xl text-center">Welcome back, {user?.name || 'User'}! Explore your dashboard!</p>
          ) : (
            <p className="text-lg text-center mb-4">Please log in or sign up to get started.</p>
          )}
        </section>
      </main>

      <footer className="bg-[#0077B6] text-white p-4 text-center">
        <p>&copy; {new Date().getFullYear()} VORTEX KNIGHTS. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
