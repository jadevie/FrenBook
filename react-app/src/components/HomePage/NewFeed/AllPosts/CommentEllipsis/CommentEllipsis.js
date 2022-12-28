import styles from './CommentEllipsis.module.css';
import React, { useEffect, useState } from 'react';
import EditCommentForm from '../EditCommentForm/EditCommentForm';
import DropDownCommentManager from './DropdownCommentManager/DropDownCommentManager';

export const CommentEllipsis = ({ comment }) => {
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
            {showMenu && <DropDownCommentManager comment={comment} />}
        </div>
    );
};

export default CommentEllipsis;
