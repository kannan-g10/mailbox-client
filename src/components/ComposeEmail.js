import React, { useState } from 'react';
import ComposeEmailEditor from './ComposeEmailEditor';
import { Link } from 'react-router-dom';
import { inboxMails } from '../helpers/inbox-helper';

const ComposeEmail = () => {
  const [email, setEmail] = useState('');
  const [sub, setSub] = useState('');
  const [content, setContent] = useState('');
  const [clearEditor, setClearEditor] = useState(false);

  const onChangeContent = body => {
    setContent(body);
  };

  const sendEmail = () => {
    inboxMails(email, sub, content);

    setEmail('');
    setSub('');
    setContent('');
    setClearEditor(true);
  };

  return (
    <div className="bg-zinc-50 p-5">
      <div className="w-1/2 mx-auto mt-10 p-10 rounded-lg border bg-slate-200">
        <div className="border-b border-b-slate-700 m-3 mb-5 flex justify-between">
          <label htmlFor="email" className="text-2xl pr-4">
            To:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            autoComplete="off"
            className="bg-slate-200 p-2 w-full outline-none"
          />
          <div>
            <span className="text-2xl px-2">Cc/Bcc</span>
          </div>
        </div>
        <input
          type="text"
          placeholder="Subject"
          value={sub}
          onChange={e => setSub(e.target.value)}
          className="bg-slate-200 m-4 mb-6 p-2 border-b border-slate-400 outline-none w-full"
        />
        <ComposeEmailEditor
          onChangeContent={onChangeContent}
          clearEditor={clearEditor}
        />
        <Link to="/">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-6 py-2 my-3 rounded-md"
            onClick={sendEmail}
          >
            Send
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ComposeEmail;
