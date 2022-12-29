import styles from './DropdownMenu.module.css';
import React from 'react';
import { useDispatch } from 'react-redux';
import { logOut } from '../../../../store/session';

const DropdownMenu = ({ user }) => {
    const dispatch = useDispatch();

    const onLogout = async (e) => {
        e.preventDefault();
        await dispatch(logOut());
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.row}>
                <div className={`${styles.iconWrapper}`}>
                    <img src={user.profile_picture_url} alt='userPhoto' className={styles.profilePicture} />
                </div>
                <div className={styles.name}>{user.username}</div>
            </div>
            <div className={`${styles.row} ${styles.signOut}`} onClick={onLogout}>
                <div className={styles.iconWrapper}>
                    <i className={`fa-solid fa-arrow-right-from-bracket`} />
                </div>
                <div className={`${styles.logout}`}>Log Out</div>
            </div>
        </div>
    );
};

export default DropdownMenu;
