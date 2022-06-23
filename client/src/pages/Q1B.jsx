import React from 'react';
import styles from '../styles/q.module.css';

const Q1B = () => {
  function reverseNumber(number) {
    var revNumber = 0;
    while (number > 0) {
      revNumber = revNumber * 10 + (number % 10);
      number = Math.floor(number / 10);
    }
    return revNumber;
  }
  return (
    <div>
      Q1B
      <div>input: 123</div>
      <div>output: {reverseNumber(123)}</div>
    </div>
  );
};

export default Q1B;
