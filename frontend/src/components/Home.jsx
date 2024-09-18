import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom'; 
import AuthContext from '../context/AuthContext'; 

const Home = () => {
  const { isLogin, logout, userRole } = useContext(AuthContext); 
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

  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        <h1 style={titleStyle}>Home Page</h1>
        {isLogin && (
          <div style={buttonContainerStyle}>
            <button onClick={handleLogout} style={logoutButtonStyle}>Logout</button>
            <button onClick={handleDashboard} style={dashboardButtonStyle}>
              {userRole === 'admin' ? 'Admin Dashboard' : 'Dashboard'}
            </button>
          </div>
        )}
      </header>
      <main style={mainStyle}>
        <div style={infoSectionStyle}>
          <h2 style={infoTitleStyle}>About Our App</h2>
          <p style={infoTextStyle}>
            Welcome to our application! We are dedicated to providing a seamless experience to our users. Our app offers a range of features including real-time data access, personalized dashboards, and much more.
            <br /><br />
            With our user-friendly interface, you can easily navigate through various sections of the app. Whether you're looking for the latest updates, detailed analytics, or just a smooth experience, we've got you covered.
            <br /><br />
            Join us on this journey and make the most out of our app's features!
          </p>
        </div>
        <div style={authContainerStyle}>
          {isLogin ? (
            <p style={welcomeTextStyle}>Welcome back!</p>
          ) : (
            <div>
              <p style={loginPromptStyle}>Please log in or sign up.</p>
              <button onClick={handleLogin} style={loginButtonStyle}>Login</button>
              <button onClick={handleSignup} style={signupButtonStyle}>Signup</button>
              <button onClick={handleAdminLogin} style={adminLoginButtonStyle}>Admin Login</button> {/* Admin Login button */}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

const containerStyle = {
  fontFamily: `'Roboto', sans-serif`,
  color: '#333',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  margin: 0,
  padding: 0,
  width: '100%',
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '15px',
  backgroundColor: '#1E2A38',
  color: '#FFFFFF',
  borderBottom: '2px solid #3E4C63',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  position: 'fixed',
  width: '100%',
  top: 0,
  left: 0,
};

const titleStyle = {
  margin: 0,
  fontSize: '1.5rem',
  fontWeight: 'bold',
};

const buttonContainerStyle = {
  display: 'flex',
  gap: '10px',
};

const logoutButtonStyle = {
  backgroundColor: '#DC3545',
  color: '#FFFFFF',
  border: 'none',
  padding: '8px 15px',
  borderRadius: '5px',
  cursor: 'pointer',
};

const dashboardButtonStyle = {
  backgroundColor: '#007BFF',
  color: '#FFFFFF',
  border: 'none',
  padding: '8px 15px',
  borderRadius: '5px',
  cursor: 'pointer',
};

const mainStyle = {
  flex: 1,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  padding: '20px',
  marginTop: '60px',
  backgroundColor: '#F4F4F9',
  textAlign: 'center',
};

const infoSectionStyle = {
  width: '50%',
  padding: '20px',
  backgroundColor: '#FFFFFF',
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  marginRight: '20px',
  textAlign: 'left',
};

const infoTitleStyle = {
  fontSize: '1.8rem',
  marginBottom: '10px',
  color: '#1E2A38',
  fontWeight: 'bold',
};

const infoTextStyle = {
  fontSize: '1rem',
  lineHeight: '1.6',
  color: '#4A4A4A',
};

const authContainerStyle = {
  width: '50%',
  textAlign: 'center',
};

const welcomeTextStyle = {
  fontSize: '1.2rem',
  color: '#4A4A4A',
};

const loginPromptStyle = {
  fontSize: '1rem',
  marginBottom: '20px',
  color: '#666',
};

const loginButtonStyle = {
  backgroundColor: '#28A745',
  color: '#FFFFFF',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '5px',
  cursor: 'pointer',
  marginRight: '10px',
};

const signupButtonStyle = {
  backgroundColor: '#17A2B8',
  color: '#FFFFFF',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '5px',
  cursor: 'pointer',
};

const adminLoginButtonStyle = {
  backgroundColor: '#FFC107',
  color: '#FFFFFF',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '5px',
  cursor: 'pointer',
  marginTop: '10px',
};

export default Home;
