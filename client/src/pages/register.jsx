import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from '../styles/register.module.css';

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [country, setCountry] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    const response = await fetch('http://localhost:8080/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
        confirm,
        country,
      }),
    });

    const data = await response.json();
    if (data.status === 'ok') {
      navigate('/login');
    }
  }
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Sign Up</h1>
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
          </div>
          <div className={styles.shaker}>
            <input
              type={'text'}
              placeholder="Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              name="name"
              className={styles.field}
              required
            />
            <input
              type={'password'}
              name="confirm"
              onChange={(e) => {
                setConfirm(e.target.value);
              }}
              placeholder="Confirm Password"
              className={styles.field}
              required
            />
          </div>
          <div className={styles.select}>
            <select
              placeholder="Select a Country"
              name="country"
              value={country}
              id=""
              onChange={(e) => {
                setCountry(e.target.value);
              }}
              required
            >
              <option value="">Select your country</option>
              <option value="jordan" placeholder="slect">
                Jordan
              </option>
              <option value="bahrain" placeholder="slect">
                Bahrain
              </option>
            </select>
          </div>
          <div className={styles.row}>
            <div>
              <input type={'checkbox'} required />
              <label>
                I agree to the <a href="/">terms and conditions</a>
              </label>
            </div>
            <input type="submit" value={'Sign Up'} className={styles.submit} />
          </div>
          <div className={styles.privacy}>
            <input type={'checkbox'} required />
            <label>
              I agree to the <a href="/">privacy policy</a>
            </label>
          </div>
        </form>
        {error && <div className={styles.error_msg}>{error}</div>}
      </div>
    </div>
  );
};

export default Register;
