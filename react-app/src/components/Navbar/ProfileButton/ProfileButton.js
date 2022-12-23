import styles from "./ProfileButton.module.css";
import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import DropdownMenu from "./DropdownMenu/DropdownMenu";



export const ProfileButton = () => {
    const [showMenu, setShowMenu] = useState(false);
    const user = useSelector(state => state.session.user);

    useEffect(() => {
        if (!showMenu) return;
        const closeMenu = () => setShowMenu(false);
        document.addEventListener('click', closeMenu);
        return () => document.removeEventListener('click', closeMenu);
    }, [showMenu]);

    return (
        <div>
            <button className={styles.profileButton} onClick={() => setShowMenu(true)}>
                <i className="fas fa-user-circle" />
            </button>
            {showMenu && <DropdownMenu user={user} />}
        </div>
    );
};
