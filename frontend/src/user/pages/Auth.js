import { useState, useEffect, useContext } from 'react';

import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';

// ==============================================

const Auth = () => {
  // --------------------------------------------

  const auth = useContext(AuthContext);

  // --------------------------------------------

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  // --------------------------------------------

  const [name, setName] = useState('blue');
  const [email, setEmail] = useState('blue@blue.com');
  const [password, setPassword] = useState('blueblue');

  useEffect(() => console.log('name: ', name), [name]);
  useEffect(() => console.log('email: ', email), [email]);
  useEffect(() => console.log('password: ', password), [password]);

  const onNameChangeHandler = (e) => setName(e.target.value);
  const onEmailChangeHandler = (e) => setEmail(e.target.value);
  const onPasswordChangeHandler = (e) => setPassword(e.target.value);

  // --------------------------------------------

  const [isLoginMode, setIsLoginMode] = useState(true);

  const switchModeHandler = () => {
    // -Pass function into state handler when state change is based on prev-state value.
    setIsLoginMode((prevMode) => !prevMode);
  };

  // --------------------------------------------

  const authSumbitHandler = async (e) => {
    e.preventDefault();
    console.log({ name, email, password });

    if (isLoginMode) {
      // log-in-mode
      // log-in-mode
      // log-in-mode

      try {
        const reponseData = await sendRequest(
          'http://localhost:5000/api/users/login',
          'POST',
          JSON.stringify({
            email: email,
            password: password,
          }),
          { 'Content-Type': 'application/json' }
        );

        // -Successful login
        auth.login(reponseData.userId, reponseData.token);
      } catch (err) {
        // -Failed login
        console.log('failed login:  err: ', err);
      }
    } else {
      // sign-in-mode
      // sign-in-mode
      // sign-in-mode

      try {
        const reponseData = await sendRequest(
          'http://localhost:5000/api/users/signup',
          'POST',
          JSON.stringify({
            name: name,
            email: email,
            password: password,
          }),
          { 'Content-Type': 'application/json' }
        );

        // -Successful login
        auth.login(reponseData.userId);
      } catch (err) {
        // -Failed login
        console.log('failed login:  err: ', err);
      }
    }
  };

  // --------------------------------------------

  const errorHandler = () => {
    clearError();
  };

  // --------------------------------------------

  return (
    <>
      <form onSubmit={authSumbitHandler}>
        <h2>Login Required</h2>

        <hr />

        {!isLoginMode && (
          <label>
            name:
            <input
              type='text'
              id='name'
              value={name}
              onChange={onNameChangeHandler}
            />
          </label>
        )}

        <br />

        <label htmlFor='email'>
          email:{' '}
          <input
            type='email'
            id='email'
            value={email}
            onChange={onEmailChangeHandler}
          />
        </label>

        <br />

        <label htmlFor='password'>
          password:{' '}
          <input
            type='password'
            id='password'
            value={password}
            onChange={onPasswordChangeHandler}
          />
        </label>

        <br />

        <button type='submit'>{isLoginMode ? 'LOGIN' : 'SIGNUP'}</button>
      </form>

      <button type='submit' onClick={switchModeHandler}>
        SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}
      </button>
    </>
  );
};

// ==============================================

export default Auth;
