import React from 'react';
import styles from '../styles/home.module.css';

const Home = () => {
  return (
    <div className={styles.center}>
      <ul>
        <h1>Click on the wanted soloution</h1>
        <li>
          <a href="/q1a">Q1 A</a>
        </li>
        <li>
          <a href="/q1b">Q1 B</a>
        </li>
        <li>
          <a href="/register">Authentication</a>
        </li>
      </ul>
    </div>
  );
};

export default Home;
