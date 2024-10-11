import React, { createContext, useState, useEffect } from 'react';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile } from 'firebase/auth';
import firebaseApp from '../firebaseConfig';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [userName, setUserName] = useState(null); // User's name state
  const auth = getAuth(firebaseApp);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLogin(true);
        setUserName(user.displayName); // Fetch the user’s name
        fetchUserLocation(); 
      } else {
        setIsLogin(false);
        setUserLocation(null);
        setUserName(null);
      }
    });
    return () => unsubscribe(); // Cleanup subscription on unmount
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

  // Signup function to accept name
  const signup = async (name, email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update user profile with the name
      await updateProfile(user, { displayName: name });
      setUserName(name);  // Set the user name in the state
      fetchUserLocation(); // Fetch the user's location after signup
    } catch (error) {
      console.error('Signup Error:', error.message);
      throw error;
    }
  };

  // Login function to handle user and admin roles
  const login = async (email, password, role = 'user') => {
    try {
      if (role === 'admin' && email === 'vortexknights' && password === 'helloworld') {
        setIsLogin(true);
        setUserName('Admin'); // Explicitly set admin name
        fetchUserLocation();
        return true; 
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        setIsLogin(true);
        setUserName(user.displayName); // Fetch the user’s name after login
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
      setUserName(null); // Clear user name on logout
    } catch (error) {
      console.error('Logout Error:', error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ isLogin, userName, signup, login, logout, userLocation }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
