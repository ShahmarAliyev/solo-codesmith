import React, { useState, useEffect } from 'react';
import './signIn.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../redux/userSlice';
import { useNavigate } from 'react-router';

const SignIn = () => {
  const disPatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => {
    return state.user;
  });

  const url = '/api/';
  const [cred, setCred] = useState({ email: '', password: '' });
  const handleChange = (e) => {
    const key = e.target.name;
    const val = e.target.value;
    setCred((prevState) => {
      return { ...prevState, [key]: val };
    });
  };

  const handleSignin = async (e) => {
    e.preventDefault();
    const response = await fetch(url + 'signin', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(cred),
    });
    const data = await response.json();
    const { _id, email, favourites, reservations } = data;
    disPatch(setUser({ _id, email, favourites, reservations }));
  };
  useEffect(() => {
    if (user?.userId) navigate('/');
  }, [user?.userId, navigate]);

  return (
    <div className='signin'>
      <span className='signinText'>Sign In </span>
      <form className='signinForm'>
        <label>
          <span className='emaillabel'>Email:</span>
          <input
            type='text'
            name='email'
            className='emailinput'
            onChange={handleChange}
          />
        </label>
        <label>
          Password:
          <input type='password' name='password' onChange={handleChange} />
        </label>
        <button onClick={handleSignin}>Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;
