import React from 'react';
import { Route, Routes } from 'react-router-dom';

import SideNav from '../components/SideNav';
import EmailList from '../components/EmailList';
import DeleteEmailLists from '../components/DeleteEmailLists';
import SentEmailLists from '../components/SentEmailLists';
import ComposeEmail from '../components/ComposeEmail';
import Header from '../components/Header';
import Error from '../components/Error';
import ReadEmail from '../components/ReadEmail';

const UserRoutes = () => {
  return (
    <>
      <Header />
      <div className="grid grid-cols-6 items-start p-3 gap-2">
        <div className="col-span-1">
          <SideNav />
        </div>
        <div className="col-span-5">
          <Routes>
            <Route path="/" element={<EmailList />} />
            <Route path="/:id" element={<ReadEmail />} />
            <Route path="/delete-emails" element={<DeleteEmailLists />} />
            <Route path="/sent-emails" element={<SentEmailLists />} />
            <Route path="/compose-email" element={<ComposeEmail />} />
            <Route path="/*" element={<Error />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default UserRoutes;
