import React, { useEffect, useState } from 'react';
import './signUp.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state.user;
  });

  const url = '/api/';
  const [pas, setPas] = useState(null);
  const [em, setEm] = useState(null);
  const handleEmChange = (e) => {
    setEm(e.target.value);
  };
  const handlePasChange = (e) => {
    setPas(e.target.value);
  };
  const handleSignup = async (e) => {
    e.preventDefault();
    let res = await fetch(url + 'signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: em, password: pas }),
    });
    let data = await res.json();
    const { _id, email, favourites, reservations } = data;
    dispatch(setUser({ _id, email, favourites, reservations }));
  };

  useEffect(() => {
    if (user?.userId) navigate('/');
  }, [user?.userId, navigate]);
  return (
    <div className='signUp'>
      <span className='signUpText'>Sign Up</span>
      <form className='signUpForm'>
        <label>
          <span>Email:</span>
          <input type='text' name='email' onChange={handleEmChange} />
        </label>
        <label>
          Password:
          <input type='password' name='password' onChange={handlePasChange} />
        </label>
        <button onClick={handleSignup}>Sign up</button>
      </form>
    </div>
  );
};

export default SignUp;
