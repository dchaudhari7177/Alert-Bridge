import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import ImportantContacts from './components/ImportantContact'; // Import the new page
import { AuthProvider } from './context/AuthContext';
import News from './components/News';
import Quotes from './components/Quotes';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/quotes" element={<Quotes />} />
          <Route path="/news" element={<News />} />
          <Route path="/important-contact" element={<ImportantContacts />} /> {/* New route */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
