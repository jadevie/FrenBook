// import styles from './Ellipsis.module.css';
import React, { useEffect, useState } from 'react';
import DropDownPostManager from './DropDownPostManager/DropDownPostManager';

export const Ellipsis = ({ post }) => {
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        if (!showMenu) return;
        const closeMenu = () => setShowMenu(false);
        document.addEventListener('click', closeMenu);
        return () => document.removeEventListener('click', closeMenu);
    }, [showMenu]);

    return (
        <div>
            <button onClick={() => setShowMenu(true)}>
                <i className="fa-solid fa-ellipsis"></i>
            </button>
            {showMenu && <DropDownPostManager post={post} />}
        </div>
    );
};
