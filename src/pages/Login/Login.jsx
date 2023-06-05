import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { setOnStorage } from '../../services/localStorage';

function Login() {
  const history = useHistory();
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });

  const [btnDisabled, setBtnDisabled] = useState(true);

  const handleChange = ({ target: { name, value } }) => {
    setLogin((prevLogin) => ({
      ...prevLogin,
      [name]: value,
    }));
  };

  const handleClick = () => {
    setOnStorage('user', {
      email: login.email,
    });
    history.push('/meals');
  };

  useEffect(() => {
    const verifyFields = () => {
      const { email, password } = login;
      const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i; // https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
      const validationEmail = emailRegex.test(email);
      const minLength = 6;
      const validationPassword = password.length > minLength;
      setBtnDisabled(!(validationEmail && validationPassword));
    };
    verifyFields();
  }, [login]);

  return (
    <section>
      <input
        type="text"
        name="email"
        value={ login.email }
        onChange={ handleChange }
        placeholder="Email"
        data-testid="email-input"
      />
      <input
        type="password"
        name="password"
        value={ login.password }
        onChange={ handleChange }
        placeholder="Password"
        data-testid="password-input"
      />
      <button
        type="button"
        onClick={ handleClick }
        disabled={ btnDisabled }
        data-testid="login-submit-btn"
      >
        Enter
      </button>
    </section>
  );
}

export default Login;
