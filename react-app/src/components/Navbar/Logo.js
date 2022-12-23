import styles from './Navbar.module.css';
import React from 'react';
import { Link } from 'react-router-dom';

export const Logo = () => {
    return (
        <div>
            <Link to="/">
                <span className={styles.logo}>FB</span>
            </Link>
        </div>
    );
};
