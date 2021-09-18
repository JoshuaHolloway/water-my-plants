import { useState, useEffect } from 'react';

// ==============================================

const User = () => {
  // --------------------------------------------

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // --------------------------------------------

  useEffect(() => console.log('email: ', email), [email]);
  useEffect(() => console.log('password: ', password), [password]);

  // --------------------------------------------

  const onEmailChangeHandler = (e) => setEmail(e.target.value);
  const onPasswordChangeHandler = (e) => setPassword(e.target.value);

  // --------------------------------------------

  const onSumbitHandler = (e) => {
    e.preventDefault();

    // -TODO: Do HTTP request here!
    // -TODO: Do HTTP request here!
    // -TODO: Do HTTP request here!
  };

  // --------------------------------------------

  return (
    <form onSubmit={onSumbitHandler}>
      <h2>Login Required</h2>
      <hr />
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

      <button type='submit'>submit</button>
    </form>
  );
};

// ==============================================

export default User;
