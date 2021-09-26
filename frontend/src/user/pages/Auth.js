import { useState, useEffect, useContext } from 'react';

import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';

// ==============================================

const Auth = () => {
  // --------------------------------------------

  const auth = useContext(AuthContext);

  // --------------------------------------------

  // const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const { sendRequest } = useHttpClient();

  // --------------------------------------------

  const [name, setName] = useState('josh');
  const [email, setEmail] = useState('josh@josh.com');
  const [password, setPassword] = useState('password');

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
          `${process.env.REACT_APP_BACKEND}/users/login`,
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
          `${process.env.REACT_APP_BACKEND}/users/signup`,
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

  const do_push = () => {
    // - - - - - - - - - - - - - - - - - - - - -

    const publicVapidKey =
      'BJthRQ5myDgc7OSXzPCMftGw-n16F7zQBEN7EUD6XxcfTTvrLGWSIG7y_JxiWtVlCFua0S8MTB5rPziBqNx1qIo';

    // - - - - - - - - - - - - - - - - - - - - -

    // Check for service worker
    if ('serviceWorker' in navigator) {
      send().catch((err) => console.error('serviceWorker error: ', err));
    }

    // - - - - - - - - - - - - - - - - - - - - -

    // Register SW, Register Push, Send Push
    async function send() {
      // Register Service Worker
      console.log('Registering service worker...');
      const register = await navigator.serviceWorker.register('/worker.js', {
        scope: '/',
      });
      console.log('Service Worker Registered...');

      // Register Push
      console.log('Registering Push...');
      const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
      });
      console.log('Push Registered...');

      // Send Push Notification
      console.log('Sending Push...');

      await fetch('http://localhost:5000/api/plants/', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
          'content-type': 'application/json',
        },
      });

      console.log('Push Sent...');
    }

    // - - - - - - - - - - - - - - - - - - - - -

    function urlBase64ToUint8Array(base64String) {
      const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
      const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

      const rawData = window.atob(base64);
      const outputArray = new Uint8Array(rawData.length);

      for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
      }
      return outputArray;
    }

    // - - - - - - - - - - - - - - - - - - - - -
  }; // do_push()

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
        {isLoginMode ? 'SIGNUP' : 'LOGIN'}
      </button>

      <button onClick={() => do_push()}>Send PUSH Notification</button>
    </>
  );
};

// ==============================================

export default Auth;
