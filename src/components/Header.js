import React from 'react';
import { logout } from '../helpers/auth-helper';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handlelogout = () => {
    logout(navigate);
  };

  return (
    <header className="flex justify-between items-center bg-emerald-200 px-20 py-3 mb-2">
      <h1 className="text-4xl font-bold font-serif">Yahoo.Com</h1>
      <button
        className="bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-bold px-5 py-3"
        onClick={handlelogout}
      >
        Logout
      </button>
    </header>
  );
};

export default Header;
