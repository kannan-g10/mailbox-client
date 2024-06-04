import DOMPurify from 'dompurify';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSingleMailToRead } from '../helpers/inbox-helper';

const ReadEmail = () => {
  const { id } = useParams();
  const [emailToRead, setEmailToRead] = useState();
  const [loading, setLoading] = useState(false);

  const createMarkup = html => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  const getSingleEmail = async () => {
    setLoading(true);
    const data = await getSingleMailToRead(id);
    setLoading(false);
    setEmailToRead(data);
  };

  useEffect(() => {
    getSingleEmail();
  }, []);

  if (loading) {
    return <p className="text-center mt-20">Loading....</p>;
  }

  return (
    <div className="flex justify-center items-center bg-zinc-100 h-[80vh]">
      <div className="w-1/2 bg-gray-300 rounded-lg p-5 m-5">
        <p className="font-medium text-xl text-ellipsis tracking-wide m-5">
          <span className="font-bold">Sender : </span>
          {emailToRead?.sender}
        </p>
        <p className="text-xl text-ellipsis tracking-wide m-5">
          <span className="font-bold">Subject : </span>
          {emailToRead?.subject}
        </p>
        <p className="text-xl mx-5 mt-5 mb-2 font-semibold">Message :</p>
        <div
          className="px-5 text-xl"
          dangerouslySetInnerHTML={createMarkup(emailToRead?.content)}
        ></div>
      </div>
    </div>
  );
};

export default ReadEmail;
