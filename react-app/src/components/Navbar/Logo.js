import styles from './Navbar.module.css';
import React from 'react';
import { Link } from 'react-router-dom';

export const Logo = () => {
    return (
        <div className={styles.link}>
            <Link to="/home" style={{ textDecoration: 'none' }}>
                <span className={styles.logo}>fb</span>
            </Link>
        </div >
    );
};
