import React, { useState } from 'react';
import backArrow from '../src/images/newBackArrow.png';
import '../styles/sign.css';

const SignUp = ({ redirectModal, closeModal }) => {
  const user = {
    name: '',
    login: '',
    password: '',
    email: ''
  };
  const [userInfo, setUserInfo] = useState(user);

  const changeHandler = e => {
    const { name, value } = e.target;
    setUserInfo(prevState => ({ ...prevState, [name]: value }));
  };

  const createUser = () => {
    const users = JSON.parse(localStorage.getItem('users'));
    users.push(userInfo);
    localStorage.users = JSON.stringify(users);
    alert('success');
    closeModal();
  };
  return (
    <div className="overlay">
      <div className="signup">
        <div className="modal-nav">
          <img src={backArrow} onClick={closeModal} />
          <span>
            Уже зарегистрированы?<button onClick={redirectModal}>Войти</button>
          </span>
        </div>
        <form className="modal-form" onSubmit={createUser}>
          <span className="modal-title">Регистрация</span>
          <input
            placeholder="Полное имя"
            name="name"
            onChange={changeHandler}
          />
          <input
            placeholder="Имя пользователя"
            name="login"
            onChange={changeHandler}
            required
          />
          <input placeholder="Email" name="email" onChange={changeHandler} />
          <input
            placeholder="Пароль"
            name="password"
            onChange={changeHandler}
            required
            type="password"
          />
          <button className="button__blue" type="submit">
            Зарегистрироваться
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
