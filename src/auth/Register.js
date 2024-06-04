import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUser } from '../helpers/auth-helper';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConsfirmPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();

    if (email == '' || password === '' || confirmPassword === '') {
      console.error('All fields are madatory!');
      return;
    }

    if (password !== confirmPassword) {
      console.error("Password doesn't match!");
      return;
    }

    await createUser(email, password, navigate);

    setEmail('');
    setConsfirmPassword('');
    setPassword('');
  };

  return (
    <div className="h-screen w-full bg-fuchsia-50 flex justify-center items-center">
      <form
        className="border-2 border-slate-500 bg-slate-100 rounded-xl px-10 py-5 flex flex-col justify-center  items-center"
        onClick={handleSubmit}
      >
        <h1 className="text-3xl text-indigo-600 font-bold m-3">Register</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="px-5 py-3 m-2 outline-none border border-slate-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="px-5 py-3 m-2 outline-none border border-slate-500"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={e => setConsfirmPassword(e.target.value)}
          required
          className="px-5 py-3 m-2 outline-none border border-slate-500"
        />
        <button
          type="submit"
          className="bg-violet-500 hover:bg-violet-400 text-white font-bold rounded-md px-5 py-3 m-3"
        >
          Register
        </button>
        <p>
          Have an account?
          <Link to="/login" className="pl-2 underline text-violet-600">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
