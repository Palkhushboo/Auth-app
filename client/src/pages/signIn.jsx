import React, { useState } from 'react';
import { Link ,useNavigate} from 'react-router-dom';

function SignIn() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const navigate=useNavigate()
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    try {
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

     navigate('/');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type="email"
          placeholder='Email'
          id='email'
          className='bg-slate-100 p-3 rounded-lg'
          onChange={handleChange}
          value={formData.email}
        />
        <input
          type="password"
          placeholder='Password'
          id='password'
          className='bg-slate-100 p-3 rounded-lg'
          onChange={handleChange}
          value={formData.password}
        />
        <button type='submit' className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-85'>
          Sign In
        </button>
      </form>
      {message && <p className='text-green-500 mt-3'>{message}</p>}
      {error && <p className='text-red-500 mt-3'>{error}</p>}
      <div className='flex gap-2 mt-5'>
        <p>Don't have an account?</p>
        <Link to={'/signup'}><span className='text-blue-500'>Sign Up</span></Link>
      </div>
    </div>
  );
}

export default SignIn;
