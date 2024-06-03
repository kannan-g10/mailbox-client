import React from 'react';
import ComposeEmailEditor from './ComposeEmailEditor';

const ComposeEmail = () => {
  return (
    <div className="w-1/2 mx-auto mt-10 p-10 bg-zinc-50 rounded-lg border">
      <div className="border-b border-b-slate-700 m-3 mb-5 flex justify-between">
        <label htmlFor="email" className="text-2xl pr-4">
          To:
        </label>
        <input
          type="email"
          id="email"
          placeholder="Email"
          className="bg-zinc-50 p-2 w-full outline-none"
        />
        <div>
          <span className="text-2xl px-2">Cc/Bcc</span>
        </div>
      </div>
      <input
        type="text"
        placeholder="Subject"
        className="bg-zinc-50 m-4 mb-6 p-2 border-b border-slate-400 outline-none w-full"
      />
      <ComposeEmailEditor />
      <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-6 py-2 my-3 rounded-md">
        Send
      </button>
    </div>
  );
};

export default ComposeEmail;
