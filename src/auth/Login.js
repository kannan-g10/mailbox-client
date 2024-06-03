import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="h-screen w-full bg-fuchsia-50 flex justify-center items-center">
      <form className="border-2 border-slate-500 rounded-xl px-10 py-5 flex flex-col justify-center  items-center">
        <h1 className="text-3xl text-indigo-600 font-bold m-3">Login</h1>
        <input
          type="email"
          placeholder="Email"
          required
          className="px-5 py-3 m-2 outline-none border border-slate-500"
        />
        <input
          type="password"
          placeholder="Password"
          required
          className="px-5 py-3 m-2 outline-none border border-slate-500"
        />
        <button className="bg-violet-500 hover:bg-violet-400 text-white font-bold rounded-md px-5 py-3 m-3">
          Login
        </button>
        <p>
          New User?
          <Link to="/register" className="pl-2 underline text-violet-600">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;