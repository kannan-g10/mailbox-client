import React, { useEffect, useState } from 'react';
import { GoDotFill } from 'react-icons/go';
import {
  deleteMail,
  getInboxMails,
  updateEmail,
} from '../helpers/inbox-helper';
import { auth } from '../config/firebase-config';
import DOMPurify from 'dompurify';
import { Link } from 'react-router-dom';
import { RiDeleteBin6Line } from 'react-icons/ri';

const EmailList = () => {
  const [listEmails, setListEmails] = useState(null);

  const getEmailInboxList = async () => {
    const userEmail = auth.currentUser.email;
    const data = await getInboxMails(userEmail);

    setListEmails(data);
  };

  const handleUpdate = id => {
    updateEmail(id);
  };

  const handleDeleteEmail = id => {
    deleteMail(id);
  };

  useEffect(() => {
    let interval = setInterval(() => {
      const res = getEmailInboxList();
    }, 2000);
    return () => {
      clearInterval(interval);
    };
  }, [listEmails]);

  const createMarkup = html => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  if (!listEmails || listEmails.length < 1) {
    return (
      <div className="w-full mt-20">
        <h1 className="text-center mx-auto">No Emails To Read</h1>
      </div>
    );
  }

  return (
    <div className="bg-gray-200 p-5">
      {listEmails?.map(email => (
        <div key={email.id} className="relative">
          <Link to={`/${email.id}`} onClick={() => handleUpdate(email.id)}>
            <div
              className={`flex items-center gap-4 m-2 ${(backGround =
                email.markAsRead
                  ? 'bg-zinc-100'
                  : 'bg-zinc-300')} px-6 py-4 rounded-md cursor-pointer hover:bg-white`}
            >
              {!email.markAsRead ? (
                <GoDotFill color="crimson" size={25} className="mt-2" />
              ) : (
                <p className="px-4"></p>
              )}
              <p className="w-1/6 font-bold text-xl pr-4 text-center">
                {email.sender}
              </p>
              <p className="w-1/6 text-start text-lg font-semibold">
                {email.subject}
              </p>
              <div
                className="w-2/4 hidden lg:block pt-[0.35rem] h-10 px-5 text-lg"
                dangerouslySetInnerHTML={createMarkup(
                  email.content.length > 25
                    ? `${email.content.slice(0, 23)}...`
                    : email.content
                )}
              ></div>
            </div>
          </Link>
          <RiDeleteBin6Line
            size={25}
            className="bg-red-500 text-white w-10 h-10 p-2 rounded-md cursor-pointer hover:bg-red-600 absolute right-10 top-5"
            onClick={() => handleDeleteEmail(email.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default EmailList;
