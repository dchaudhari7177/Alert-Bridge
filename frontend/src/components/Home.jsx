import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Home = () => {
  const { isLogin, logout, userRole, user } = useContext(AuthContext); // Ensure `user` is included in context
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
    navigate('/news'); // Navigate to the News page
  };

  const handleQuotesRedirect = () => {
    navigate('/quotes'); // Navigate to the Quotes page
  };

  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        <h1 style={titleStyle}>Welcome to Our App</h1>
        {isLogin && (
          <div style={buttonContainerStyle}>
            <button onClick={handleLogout} style={logoutButtonStyle}>Logout</button>
            <button onClick={handleDashboard} style={dashboardButtonStyle}>
              {userRole === 'admin' ? 'Admin Dashboard' : 'Dashboard'}
            </button>
            <button onClick={handleImportantContact} style={importantContactButtonStyle}>Important Contact</button>
            <button onClick={handleQuotesRedirect} style={quotesButtonStyle}>Quotes</button> {/* New Quotes button */}
          </div>
        )}
      </header>
      <main style={mainStyle}>
        <section style={infoSectionStyle}>
          <h2 style={infoTitleStyle}>About Our Website</h2>
          <p style={infoTextStyle}>
            Our platform is designed to provide users with a smooth and interactive experience.
            We offer real-time data, personalized dashboards, and a wide range of features
            to help you stay informed and connected. From monitoring weather conditions to accessing
            the latest updates, our app is your one-stop solution for all your needs.
            <br /><br />
            Our key features include:
          </p>
          <ul style={featureListStyle}>
            <li>Real-time weather updates and forecasts</li>
            <li>Personalized user and admin dashboards</li>
            <li>Advanced analytics and reporting</li>
            <li>Responsive design for seamless access across devices</li>
          </ul>
        </section>
        <section style={authContainerStyle}>
          {isLogin ? (
            <div>
              <p style={welcomeTextStyle}>Welcome back, {user?.name || 'User'}! Explore your dashboard!</p>
              <button onClick={handleNewsRedirect} style={newsButtonStyle}>News of Disasters</button> {/* New button */}
            </div>
          ) : (
            <div style={authButtonContainerStyle}>
              <p style={loginPromptStyle}>Please log in or sign up to get started.</p>
              <button onClick={handleLogin} style={loginButtonStyle}>Login</button>
              <button onClick={handleSignup} style={signupButtonStyle}>Signup</button>
              <button onClick={handleAdminLogin} style={adminLoginButtonStyle}>Admin Login</button>
            </div>
          )}
        </section>
      </main>
      <footer style={footerStyle}>
        <p style={footerTextStyle}>
          &copy; {new Date().getFullYear()} Our App. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

// Styles...

const containerStyle = {
  fontFamily: `'Poppins', sans-serif`,
  color: '#333',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  margin: 0,
  padding: 0,
  backgroundColor: '#F0F8FF',
  width: '100%',
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '20px',
  backgroundColor: '#0077B6',
  color: '#FFFFFF',
  position: 'fixed',
  width: '100%',
  top: 0,
  left: 0,
  zIndex: 1000,
};

const titleStyle = {
  fontSize: '2rem',
  fontWeight: 'bold',
};

const buttonContainerStyle = {
  display: 'flex',
  gap: '15px',
};

const logoutButtonStyle = {
  backgroundColor: '#FF6F61',
  color: '#FFFFFF',
  padding: '10px 20px',
  borderRadius: '5px',
  cursor: 'pointer',
  border: 'none',
  fontSize: '1rem',
  transition: 'background-color 0.3s',
};

const dashboardButtonStyle = {
  backgroundColor: '#5A67D8',
  color: '#FFFFFF',
  padding: '10px 20px',
  borderRadius: '5px',
  cursor: 'pointer',
  border: 'none',
  fontSize: '1rem',
  transition: 'background-color 0.3s',
};

const quotesButtonStyle = {
  backgroundColor: '#F39C12', // A distinct color for the Quotes button
  color: '#FFFFFF',
  padding: '10px 20px',
  borderRadius: '5px',
  cursor: 'pointer',
  border: 'none',
  marginTop: '10px',
  fontSize: '1rem',
  transition: 'background-color 0.3s',
};

const newsButtonStyle = {
  backgroundColor: '#F39C12', // A distinct color for the news button
  color: '#FFFFFF',
  padding: '10px 20px',
  borderRadius: '5px',
  cursor: 'pointer',
  border: 'none',
  marginTop: '10px',
  fontSize: '1rem',
  transition: 'background-color 0.3s',
};


// The remaining styles...


const importantContactButtonStyle = {  // New button style
  backgroundColor: '#28A745',
  color: '#FFFFFF',
  padding: '10px 20px',
  borderRadius: '5px',
  cursor: 'pointer',
  border: 'none',
  fontSize: '1rem',
  transition: 'background-color 0.3s',
};

const mainStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  padding: '80px 20px 20px 20px',
  backgroundColor: '#F0F4FF',
  textAlign: 'center',
};

const infoSectionStyle = {
  width: '60%',
  padding: '20px',
  backgroundColor: '#FFFFFF',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  textAlign: 'left',
  animation: 'fadeIn 1s ease-in-out',
};

const infoTitleStyle = {
  fontSize: '2rem',
  color: '#0077B6',
  fontWeight: 'bold',
};

const infoTextStyle = {
  fontSize: '1.2rem',
  lineHeight: '1.8',
  color: '#333333',
  marginTop: '15px',
};

const featureListStyle = {
  marginTop: '15px',
  padding: '0',
  listStyleType: 'none',
  fontSize: '1rem',
  lineHeight: '1.5',
  color: '#0077B6',
};

const authContainerStyle = {
  width: '35%',
  backgroundColor: '#0077B6',
  color: '#FFFFFF',
  padding: '20px',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  animation: 'fadeInRight 1s ease-in-out',
};

const authButtonContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const welcomeTextStyle = {
  fontSize: '1.5rem',
  marginBottom: '20px',
};

const loginPromptStyle = {
  fontSize: '1.2rem',
  marginBottom: '20px',
};

const loginButtonStyle = {
  backgroundColor: '#FF6F61',
  color: '#FFFFFF',
  padding: '12px 25px',
  borderRadius: '5px',
  cursor: 'pointer',
  border: 'none',
  marginBottom: '10px',
  transition: 'transform 0.3s',
};

const signupButtonStyle = {
  backgroundColor: '#17A2B8',
  color: '#FFFFFF',
  padding: '12px 25px',
  borderRadius: '5px',
  cursor: 'pointer',
  border: 'none',
  marginBottom: '10px',
  transition: 'transform 0.3s',
};

const adminLoginButtonStyle = {
  backgroundColor: '#FFC107',
  color: '#FFFFFF',
  padding: '12px 25px',
  borderRadius: '5px',
  cursor: 'pointer',
  border: 'none',
  transition: 'transform 0.3s',
};

const footerStyle = {
  backgroundColor: '#0077B6',
  color: '#FFFFFF',
  padding: '10px',
  textAlign: 'center',
  position: 'fixed',
  bottom: 0,
  width: '100%',
};

const footerTextStyle = {
  fontSize: '0.9rem',
  margin: 0,
};

export default Home;
