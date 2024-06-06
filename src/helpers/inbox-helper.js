import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { auth, db } from '../config/firebase-config';
import { Timestamp } from 'firebase/firestore';

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
      createdAt: Timestamp.fromDate(new Date()),
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

    let emails = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    if (emails.length) {
      emails = emails.sort(
        (a, b) => b.createdAt.toMillis() - a.createdAt.toMillis()
      );
    }
    return emails;
  } catch (error) {
    console.error('Error getting inbox emails:', error);
    throw error;
  }
};

export const getSentEmails = async senderEmail => {
  try {
    const emailRef = collection(db, 'Emails');
    const q = query(emailRef, where('sender', '==', senderEmail));

    const querySnapshot = await getDocs(q);

    let emails = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    if (emails.length) {
      emails = emails.sort(
        (a, b) => b.createdAt.toMillis() - a.createdAt.toMillis()
      );
    }

    return emails;
  } catch (error) {
    console.error('Error getting sent emails:', error);
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

export const updateEmail = async id => {
  try {
    const docRef = doc(db, 'Emails', id);
    await updateDoc(docRef, { markAsRead: true });
  } catch (err) {
    console.error('Error While updating mail:', err);
    throw err;
  }
};

export const deleteMail = async id => {
  try {
    console.log(id);
    const docRef = doc(db, 'Emails', id);
    await updateDoc(docRef, { receiver: '' });
  } catch (err) {
    console.error('Error getting mail:', err);
    throw err;
  }
};
