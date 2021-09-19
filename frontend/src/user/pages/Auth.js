import { useState, useEffect, useContext } from 'react';

import { AuthContext } from '../../shared/context/auth-context';

// ==============================================

const Auth = () => {
  // --------------------------------------------

  const auth = useContext(AuthContext);

  // --------------------------------------------

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
    } else {
      // sign-in-mode
      try {
        const response = await fetch('http://localhost:5000/api/users/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: name,
            email: email,
            password: password,
          }),
        });

        const responseData = await response.json();
        console.log('responseData: ', responseData);
      } catch (err) {
        console.log(err);
      }
    }

    auth.login();
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
