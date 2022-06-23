import React from 'react';
import { useState } from 'react';

import styles from '../styles/login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    const response = await fetch('http://localhost:8080/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();
    if (data.user) {
      localStorage.setItem('token', data.user);
      alert('login successful');
      window.location.href = '/welcome';
    } else {
      alert('please check your username or password');
    }
  }
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Log in</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <div className={styles.shaker}>
            <input
              type={'email'}
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className={styles.field}
              required
            />
            <input
              type={'password'}
              name="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Password"
              className={styles.field}
              required
            />
            <div className={styles.forgot}>
              <a href="/">forgot passowrd?</a>
            </div>
            <input
              type={'submit'}
              className={styles.submit}
              value={'Sign Up'}
            />
            <div className={styles.redirect}>
              Dont have an account? <a href="/register">Sign Up</a>
            </div>
          </div>
        </form>
        {error && <div className={styles.error_msg}>{error}</div>}
      </div>
    </div>
  );
};

export default Login;
