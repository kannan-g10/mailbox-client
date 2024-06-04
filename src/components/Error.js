import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <div className="z-10 h-screen w-full inset-0 absolute bg-zinc-300 text-xl text-red-500 flex justify-center items-center">
      <div>
        404 Not Found!
        <Link
          to="/"
          className="px-2 underline text-violet-600 text-xl font-medium"
        >
          Back
        </Link>
      </div>
    </div>
  );
};

export default Error;
