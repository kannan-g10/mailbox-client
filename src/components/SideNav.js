import React from 'react';
import { Link } from 'react-router-dom';

const SideNav = () => {
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
        </Link>
        <Link
          to="/sent-emails"
          className="px-16 py-3 font-bold text-xl text-slate-600 hover:bg-zinc-100 cursor-pointer"
        >
          Sent
        </Link>
        <Link
          to="/delete-emails"
          className="px-16 py-3 font-bold text-xl text-slate-600 hover:bg-zinc-100 cursor-pointer"
        >
          Delete
        </Link>
      </nav>
    </div>
  );
};

export default SideNav;
