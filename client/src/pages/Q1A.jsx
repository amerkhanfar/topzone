import React from 'react';
import styles from '../styles/q.module.css';

const Q1A = () => {
  const twoSum = function (nums, target) {
    for (let i = 0; i < nums.length; i++) {
      for (let j = i + 1; j < nums.length; j++) {
        if (nums[i] + nums[j] === target) {
          return [i, j];
        }
      }
    }
  };

  return (
    <div>
      Q1A
      <div>Input: nums = [3,2,4] , target = 6</div>
      <div>Output:{twoSum([3, 2, 4], 6)}</div>
    </div>
  );
};

export default Q1A;
