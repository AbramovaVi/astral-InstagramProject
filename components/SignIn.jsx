import React, { useState } from 'react';
import backArrow from '../src/images/newBackArrow.png';
import '../styles/sign.css';

const SignIn = ({ redirectModal, closeModal }) => {
  const data = {
    login: '',
    password: ''
  };

  const [loginInfo, setLoginInfo] = useState(data);

  const changeHandler = e => {
    const { name, value } = e.target;
    setLoginInfo(prevState => ({ ...prevState, [name]: value }));
  };

  const login = e => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem('users'));
    users.forEach(item => {
      if (item.login === loginInfo.login) {
        localStorage.setItem('isLogged', true);
        localStorage.currentUser = item.login;
        document.location.href = '/';
        closeModal();
      }
    });
  };

  const logout = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isLogged');

    document.location.href = '/';
    closeModal();
  };

  return (
    <div className="overlay">
      <div className="signin">
        <div className="modal-nav">
          <img src={backArrow} onClick={closeModal} />
          <span>
            Нет аккаунта?
            <button onClick={redirectModal}>Зарегистрируйтесь</button>
          </span>
        </div>
        {!localStorage.getItem('isLogged') ? (
          <form className="modal-form" onSubmit={login}>
            <span className="modal-title">Вход</span>
            <input
              placeholder="Имя пользователя или email"
              name="login"
              onChange={changeHandler}
              required
            />
            <input
              placeholder="Пароль"
              name="password"
              onChange={changeHandler}
              required
            />
            <button className="button__blue">Войти</button>
          </form>
        ) : (
          <>
            <span className="modal-title">you are already logged</span>
            <button className="button__blue" onClick={logout}>
              logout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default SignIn;
