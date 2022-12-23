import styles from './Navbar.module.css';
import React from 'react';
import { Logo } from './Logo';
import { ProfileButton } from './ProfileButton/ProfileButton';

const Navbar = () => {
    return (
        <div className={styles.wrapper}>
            <Logo />
            <ProfileButton />
        </div>
    );
};

export default Navbar;
