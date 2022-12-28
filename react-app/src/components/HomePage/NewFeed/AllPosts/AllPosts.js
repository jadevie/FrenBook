import styles from './AllPosts.module.css';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../../../store/posts';
import CommentForm from './CommentForm/CommentForm';
import { Ellipsis } from './Ellipsis/Ellipsis';
import { CommentEllipsis } from './CommentEllipsis/CommentEllipsis';
import EditCommentForm from './EditCommentForm/EditCommentForm';


const AllPosts = ({ user }) => {
    const editComment = useSelector(state => state.commentDetails.comment);
    const posts = useSelector(state => state.posts);
    const allposts = posts.allPosts;
    const postArray = Object.values(allposts)
        .sort((a, b) => a.id < b.id ? 1 : -1);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);

    return (
        <div>{postArray.map((post, i) =>
            <div className={styles.postWrapper} key={i}>
                <div className={styles.headerWrapper} >
                    <div className={styles.userImage}>
                        <img src={`${post.user.profile_picture_url}`} alt='profile' className={styles.userImage} />
                    </div>
                    <div className={styles.nameAndTimeWrapper}>
                        <div>{post.user.username}</div>
                        <div>{post.created_at}</div>
                    </div>
                    <div>
                        {user.id === post.user_id ? <Ellipsis post={post} /> : null}
                    </div>
                </div>

                <div>{post.body}</div>

                <div>
                    {post.images.length ? post.images.map((image, i) => <img key={i} id='postImage' alt='postImage' src={image.image_url} />) : null}
                </div>

                <div className={styles.comments}>
                    {post.comments.length ? post.comments.map((comment, i) =>
                        <div key={i}>
                            <div className={styles.userImageSmall}>
                                <img src={`${comment.user.profile_picture_url}`} alt='profile' className={styles.userImageSmall} />
                            </div>
                            {comment.body}
                            {comment.user_id === user.id ? <CommentEllipsis comment={comment} /> : null}
                            {<div id='editComment' className={editComment && editComment.id === comment.id ? styles.showEditComment : styles.hideEditComment}>
                                {<EditCommentForm comment={comment} />}
                            </div>}
                        </div>) : null}
                </div>

                <div className={styles.commentForm}>
                    <div className={styles.userImageSmall}>
                        <img src={`${post.user.profile_picture_url}`} alt='profile' className={styles.userImageSmall} />
                    </div>
                    <CommentForm post={post} />
                </div>
            </div>)}
        </div>
    );
};

export default AllPosts;
