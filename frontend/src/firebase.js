// src/firebase.js
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import app from './firebaseConfig';

// Initialize Firebase services
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };
