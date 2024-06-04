import React, { useEffect, useState } from 'react';
import { GoDotFill } from 'react-icons/go';
import { getInboxMails, updateEmail } from '../helpers/inbox-helper';
import { auth } from '../config/firebase-config';
import DOMPurify from 'dompurify';
import { Link } from 'react-router-dom';

const EmailList = () => {
  const [listEmails, setListEmails] = useState(null);
  const [loding, setLoading] = useState(false);

  const getEmailInboxList = async () => {
    setLoading(true);
    const userEmail = auth.currentUser.email;
    const data = await getInboxMails(userEmail);

    setLoading(false);
    setListEmails(data);
  };

  const handleUpdate = id => {
    updateEmail(id);
  };

  useEffect(() => {
    getEmailInboxList();
  }, []);

  const createMarkup = html => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  if (loding) {
    return <p className="text-center mt-20">Loading....</p>;
  }

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
        <Link
          to={`/${email.id}`}
          key={email.id}
          onClick={() => handleUpdate(email.id)}
        >
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
              className="w-2/4 pt-[0.35rem] h-10 px-5 text-lg"
              dangerouslySetInnerHTML={createMarkup(
                email.content.length > 25
                  ? `${email.content.slice(0, 25)}...`
                  : email.content
              )}
            ></div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default EmailList;
