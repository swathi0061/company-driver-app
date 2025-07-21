import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = ({ onLogin }) => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const valid = onLogin(form.username, form.password);
    if (!valid) {
      toast.error('Invalid credentials!', {
        position: 'top-center',
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-teal-900 text-black">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-200 p-8 rounded-2xl shadow-lg w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <div className="mb-4">
          {/* <label className="block mb-1">Username</label> */}
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="w-full p-2 rounded text-black"
            required
          />
        </div>

        <div className="mb-6 relative">
          {/* <label className="block mb-1">Password</label> */}
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-2 rounded text-black pr-10"
            required
          />
          <span
            className="absolute right-3 top-3 cursor-pointer text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button
          type="submit"
          className="w-full bg-teal-600 hover:bg-teal-500 p-2 rounded font-semibold"
        >
          Login
        </button>
        <ToastContainer />
      </form>
    </div>
  );
};

export default Login;
