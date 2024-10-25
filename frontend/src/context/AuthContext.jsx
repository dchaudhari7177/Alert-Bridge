import React, { createContext, useState, useEffect } from 'react';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendEmailVerification,
  sendPasswordResetEmail
} from 'firebase/auth';
import firebaseApp from '../firebaseConfig';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [userName, setUserName] = useState(null);
  const auth = getAuth(firebaseApp);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLogin(true);
        setUserName(user.displayName);
        fetchUserLocation();
      } else {
        setIsLogin(false);
        setUserLocation(null);
        setUserName(null);
      }
    });
    return () => unsubscribe();
  }, [auth]);

  const fetchUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
        },
        (error) => {
          console.error('Error fetching location:', error);
          setUserLocation(null);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  const signup = async (name, email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: name });
      setUserName(name);

      await sendVerificationEmail(user);

      await signOut(auth); 
    } catch (error) {
      console.error('Signup Error:', error.message);
      throw error;
    }
  };

  const sendVerificationEmail = async (user) => {
    try {
      await sendEmailVerification(user);
      console.log('Verification email sent to:', user.email);
    } catch (error) {
      console.error('Error sending verification email:', error.message);
    }
  };

  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      console.log('Password reset email sent to:', email);
    } catch (error) {
      console.error('Error sending password reset email:', error.message);
      throw error;
    }
  };

  const login = async (email, password, role = 'user') => {
    try {
      if (role === 'admin' && email === 'vortexknights' && password === 'helloworld') {
        setIsLogin(true);
        setUserName('Admin');
        fetchUserLocation();
        return true;
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        if (!user.emailVerified) {
          alert('Please verify your email before logging in.');
          return false;
        }

        setIsLogin(true);
        setUserName(user.displayName);
        fetchUserLocation();
        return true;
      }
    } catch (error) {
      console.error('Login Error:', error.message);
      return false;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setIsLogin(false);
      setUserLocation(null);
      setUserName(null);
    } catch (error) {
      console.error('Logout Error:', error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ isLogin, userName, signup, login, logout, resetPassword, userLocation }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
