import styles from './Tagline.module.css';
import React from 'react';

const Tagline = () => {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.frenbook}>frenbook</div>
        <h2 className={styles.tagline}>Connect with friends and the world around you on Frenbook.</h2>
      </div>
    </>
  );
};

export default Tagline;
