import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { auth, db } from '../config/firebase-config';

export const inboxMails = async (receiverEmail, subject, content, navigate) => {
  try {
    if (!/^\S+@\S+\.\S+$/.test(receiverEmail)) {
      throw new Error('Invalid email address');
    }

    const docRef = collection(db, 'Emails');
    await addDoc(docRef, {
      receiver: receiverEmail,
      sender: auth.currentUser.email,
      subject,
      content,
      markAsRead: false,
    });

    if (navigate) {
      navigate('/');
    }
  } catch (err) {
    console.error('Error sending email:', err);
    throw err;
  }
};

export const getInboxMails = async receiverEmail => {
  try {
    const emailRef = collection(db, 'Emails');
    const q = query(emailRef, where('receiver', '==', receiverEmail));

    const querySnapshot = await getDocs(q);

    const emails = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return emails;
  } catch (error) {
    console.error('Error getting emails:', error);
    throw error;
  }
};

export const getSentEmails = async senderEmail => {
  try {
    const emailRef = collection(db, 'Emails');
    const q = query(emailRef, where('sender', '==', senderEmail));

    const querySnapshot = await getDocs(q);

    const emails = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return emails;
  } catch (error) {
    console.error('Error getting emails:', error);
    throw error;
  }
};

export const getSingleMailToRead = async id => {
  try {
    const emailDocRef = doc(db, 'Emails', id);
    const emailDoc = await getDoc(emailDocRef);

    if (emailDoc.exists()) {
      return { id: emailDoc.id, ...emailDoc.data() };
    } else {
      throw new Error('No such document!');
    }
  } catch (err) {
    console.error('Error getting mail:', err);
    throw err;
  }
};

export const updateEmail = () => {
  console.log('updating');
};
