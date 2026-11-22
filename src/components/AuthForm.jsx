import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, login, clearAuthError } from '../store/authSlice';

export default function AuthForm() {
  const dispatch = useDispatch();
  const authError = useSelector((state) => state.auth.authError);

  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');

  const displayError = localError || authError;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalError('');
    dispatch(clearAuthError());

    if (!email.trim() || !password.trim()) {
      setLocalError('Email and password are required.');
      return;
    }

    if (isRegister) {
      if (!name.trim()) {
        setLocalError('Full name is required to register.');
        return;
      }
      if (password.length < 6) {
        setLocalError('Password must be at least 6 characters.');
        return;
      }
      dispatch(registerUser({ name, email, password }));
    } else {
      dispatch(login({ email, password }));
    }
  };

  const toggleMode = () => {
    setIsRegister((prev) => !prev);
    setLocalError('');
    dispatch(clearAuthError());
  };

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-sm border border-slate-200">
      <h2 className="text-2xl font-bold text-slate-900 mb-1">
        {isRegister ? 'Create an Account' : 'Sign In'}
      </h2>
      <p className="text-sm text-slate-500 mb-6">
        {isRegister ? 'Register a new team account' : 'Sign in with your registered account'}
      </p>

      {displayError && (
        <div className="mb-4 p-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg">
          {displayError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {isRegister && (
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}            
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}          
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}        
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-black hover:bg-gray-800 text-white font-medium py-2.5 rounded-lg transition"
        >
          {isRegister ? 'Register' : 'Login'}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-slate-600">
        {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
        <button
          type="button"
          onClick={toggleMode}
          className="text-gray-800 font-medium hover:underline"
        >
          {isRegister ? 'Sign In' : 'Register'}
        </button>
      </div>
    </div>
  );
}