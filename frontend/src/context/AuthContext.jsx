import React, { createContext, useState, useEffect } from 'react';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import firebaseApp from '../firebaseConfig'; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const auth = getAuth(firebaseApp); 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLogin(true);
        fetchUserLocation(); 
      } else {
        setIsLogin(false);
        setUserLocation(null);
      }
    });
    return () => unsubscribe();
  }, [auth]);

  const fetchUserLocation = () => {
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
  };

  const signup = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      fetchUserLocation();
    } catch (error) {
      console.error('Signup Error:', error.message);
      throw error;
    }
  };

  const login = async (email, password, role = 'user') => {
    try {
      if (role === 'admin' && email === 'vortexknights' && password === 'helloworld') {
        setIsLogin(true);
        fetchUserLocation(); 
        return true; 
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        setIsLogin(true);
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
    } catch (error) {
      console.error('Logout Error:', error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ isLogin, setIsLogin, signup, login, logout, userLocation }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
