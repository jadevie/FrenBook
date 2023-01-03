import styles from './DropdownMenu.module.css';
import React from 'react';
import { useDispatch } from 'react-redux';
import { logOut } from '../../../../store/session';
import { Link } from "react-router-dom";

const DropdownMenu = ({ user }) => {
    const dispatch = useDispatch();

    const onLogout = async (e) => {
        e.preventDefault();
        await dispatch(logOut());
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.row}>
                <div className={`${styles.photoWrapper}`}>
                    <img src={user.profile_picture_url} alt='userPhoto' className={styles.profilePicture} />
                </div>
                <div className={styles.name}>{user.username}</div>
            </div>

            <div className={styles.row}>
                <div className={`${styles.iconWrapper}`}>
                    <i className="fa-brands fa-linkedin"></i>
                </div>
                <div className={`${styles.info}`}>
                    <a href='https://www.linkedin.com/in/jadetran603/' target="#">Meet Jade</a>
                </div>
            </div>

            <div className={styles.row}>
                <div className={`${styles.iconWrapper}`}>
                    <i className="fa-brands fa-github"></i>
                </div>
                <div className={`${styles.info}`}>
                    <a href='https://github.com/jadevie' target="#">Jade's Github</a>
                </div>
            </div>
            <div className={`${styles.row} ${styles.signOut}`} onClick={onLogout}>
                <div className={styles.iconWrapper}>
                    <i className={`fa-solid fa-arrow-right-from-bracket`} />
                </div>
                <div className={`${styles.info}`}>Log Out</div>
            </div>
        </div>
    );
};

export default DropdownMenu;
