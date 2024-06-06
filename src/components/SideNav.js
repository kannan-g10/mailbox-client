import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getInboxMails } from '../helpers/inbox-helper';
import { auth } from '../config/firebase-config';

const SideNav = () => {
  const [emails, setEmails] = useState([]);
  const [count, setCount] = useState(0);

  const getEmailInboxList = async () => {
    try {
      const userEmail = auth.currentUser.email;
      const data = await getInboxMails(userEmail);
      setEmails(data);
      const unreadEmails = emails.filter(email => !email.markAsRead);
      setCount(unreadEmails.length);
    } catch (error) {
      console.error('Error fetching emails:', error);
    }
  };

  useEffect(() => {
    getEmailInboxList();
  }, [emails]);

  return (
    <div className="bg-zinc-300 flex flex-col justify-center items-center">
      <Link
        to="/compose-email"
        className="mt-5 bg-blue-500 hover:bg-blue-600 text-white font-bold px-5 py-2 rounded-md"
      >
        Compose
      </Link>
      <nav className="my-10 flex flex-col">
        <Link
          to="/"
          className="px-16 py-3 font-bold text-xl text-slate-600 hover:bg-zinc-100 cursor-pointer"
        >
          Inbox
          {count > 0 && (
            <sup className="bg-red-600 text-white font-bold rounded-full px-1">
              {count}
            </sup>
          )}
        </Link>
        <Link
          to="/sent-emails"
          className="px-16 py-3 font-bold text-xl text-slate-600 hover:bg-zinc-100 cursor-pointer"
        >
          Sent
        </Link>
      </nav>
    </div>
  );
};

export default SideNav;
