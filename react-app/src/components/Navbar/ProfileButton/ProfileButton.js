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
      <>
        <div className={styles.wrapper}>
          <div className={styles.iconWrapper}>
            <a href="https://www.linkedin.com/in/jadevtran/" target="#">
              <div className={styles.navIcons}>
                <i className="fa-brands fa-linkedin"></i>
              </div>
            </a>
          </div>

          <div className={styles.iconWrapper}>
            <a href="https://github.com/jadevie" target="#">
              <div className={styles.navIcons}>
                <i className="fa-brands fa-github"></i>
              </div>
            </a>
          </div>

          <div>
            <button onClick={() => setShowMenu(true)}>
              <img
                src={user.profile_picture_url}
                alt="userPhoto"
                className={styles.profilePicture}
              />
            </button>
            {showMenu && <DropdownMenu user={user} />}
          </div>
        </div>
      </>
    );
};
