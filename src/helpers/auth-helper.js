import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

import { auth, db } from '../config/firebase-config';

export const createUser = async (email, password, navigate) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);

    const user = auth.currentUser;

    if (user) {
      const docRef = doc(db, 'Users', user.uid);
      await setDoc(docRef, { email, password, imageUrl: '' });
      navigate('/');
    }
  } catch (err) {
    throw err;
  }
};

export const loginUser = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    console.log('Login successful!');
    window.location.href = '/';
  } catch (err) {
    throw err;
  }
};

export const logout = async navigate => {
  try {
    auth.signOut();
    navigate('/');
  } catch (err) {
    throw err;
  }
};
