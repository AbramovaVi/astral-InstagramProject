import React, { useState, useEffect } from 'react';
import { useData } from '../utils/dataHook';
import { getData } from '../utils/index';

import SignUp from './SignUp';
import Feed from './Feed';
import SignIn from './SignIn';
import '../styles/app.css';

import { posts } from '../post';
import { users } from '../post';

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData().then(res => {
      if (!localStorage.getItem('posts')) {
        localStorage.setItem('posts', JSON.stringify(res.data.posts));
      }
      if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify(res.data.users));
      }
      setData(res.data.posts);
    });
  });

  // localStorage.setItem('posts',JSON.stringify(posts));
  // localStorage.setItem('users',JSON.stringify(users));

  const [signUpIsOpen, setSignUpIsOpen] = useState(false);
  const [signInIsOpen, setSignInIsOpen] = useState(false);

  const handleSignUp = () => {
    setSignUpIsOpen(!signUpIsOpen);
    setSignInIsOpen(false);
  };

  const handleSignIn = () => {
    setSignInIsOpen(!signInIsOpen);
    setSignUpIsOpen(false);
  };

  const redirectModal = () => {
    setSignUpIsOpen(!signUpIsOpen);
    setSignInIsOpen(!signInIsOpen);
  };

  const closeModal = () => {
    setSignUpIsOpen(false);
    setSignInIsOpen(false);
  };

  return (
    <div>
      <span className="main-logo">Instagram</span>
      <div className="nav-buttons">
        <button className="nav-buttons__login" onClick={handleSignIn}>
          Войти
        </button>
        <button className="nav-buttons__signup" onClick={handleSignUp}>
          Зарегистрироваться
        </button>
      </div>
      <Feed data={data} />
      {signUpIsOpen && (
        <SignUp redirectModal={redirectModal} closeModal={closeModal} />
      )}
      {signInIsOpen && (
        <SignIn redirectModal={redirectModal} closeModal={closeModal} />
      )}
    </div>
  );
};

export default App;
