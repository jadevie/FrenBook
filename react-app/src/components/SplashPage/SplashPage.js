import styles from './SplashPage.module.css';
import React from 'react';
import Tagline from './Tagline/Tagline';
import LoginForm from './LoginForm/LoginForm';


export default function SplashPage() {
    return (
        <div className={styles.page}>
            <div className={styles.wrapper}>
                <div>
                    <Tagline />
                </div>
                <div>
                    <LoginForm />
                </div>
            </div>
        </div>
    );
};
