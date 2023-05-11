import React from 'react';
import SignIn from '../components/signIn';
import SignUp from '../components/signUp';
import './signInUp.scss';
const SignInUp = () => {
  return (
    <div className='signINsignUpcontainer'>
      <SignIn />
      <SignUp />
    </div>
  );
};

export default SignInUp;
