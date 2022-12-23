import styles from './HomePage.module.css';
import React from 'react';
import Navbar from '../Navbar/Navbar';

const HomePage = () => {
    return (
        <>
            <div className={styles.HomePage}>
                <Navbar />
            </div>

        </>
    );
};

export default HomePage;
