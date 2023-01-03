import styles from './AllPosts.module.css';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addLike, getPosts, removeLike } from '../../../../store/posts';
import CommentForm from './CommentForm/CommentForm';
import { Ellipsis } from './Ellipsis/Ellipsis';
import { CommentEllipsis } from './CommentEllipsis/CommentEllipsis';
import EditCommentForm from './EditCommentForm/EditCommentForm';

const AllPosts = ({ user }) => {
    const dispatch = useDispatch();

    const editComment = useSelector(state => state.commentDetails.comment);
    const posts = useSelector(state => state.posts);
    const allposts = posts.allPosts;
    const postArray = Object.values(allposts)
        .sort((a, b) => a.id < b.id ? 1 : -1);

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);


    const handleLikeAction = async post_id => {
        const newLike = { post_id, user_id: user.id };
        const targetPost = postArray.find(post => post.id === post_id);
        const like = targetPost.likes.find(like => like.user_id === user.id);

        if (targetPost.likes.length) {
            if (!like) {
                await dispatch(addLike(newLike));
            }

            if (like) {
                await dispatch(removeLike(newLike));
            }
        }
        if (targetPost.likes.length === 0) {
            if (!like) {
                await dispatch(addLike(newLike));
            }
        }
    };

    return (
        <div>{postArray.map((post, i) =>
            <div key={i}>
                <div className={styles.postWrapper}>
                    <div className={styles.headerWrapper} >
                        <div className={styles.userImage}>
                            <img src={`${post.user.profile_picture_url}`} alt='profile' className={styles.userImage} />
                        </div>
                        <div className={styles.nameAndTimeWrapper}>
                            <div className={styles.name}>{post.user.username}</div>
                            <div className={styles.time}>{post.created_at}</div>
                        </div>
                        <div className={styles.ellipsis}>
                            {user.id === post.user_id ? <Ellipsis post={post} /> : null}
                        </div>
                    </div>

                    <div className={styles.body}>{post.body}</div>

                    <div className={styles.postImageWrapper}>
                        {post.images.length ? post.images.map((image, i) => <img key={i} id='postImage' alt='' src={image.image_url} className={styles.image} onError={e => e.target.style.display = 'none'} />) : null}
                    </div>

                    <div className={styles.postLikeCommentWrapper}>
                        <div className={styles.postLikeInfo}>
                            <div className={styles.like}><i className="fa-regular fa-thumbs-up"></i>
                            </div>
                            <div className={styles.count}>{post.likes.length}</div>
                        </div>
                        <div className={styles.postCommentInfo}>
                            <div className={styles.count}>{`${post.comments.length} comments`}</div>
                        </div>
                    </div>

                    <div className={styles.actionWrapper}>
                        <button className={styles.actionBtnWrapper} onClick={() => handleLikeAction(post.id)} >
                            <span className={post.likes.find(like => like.user_id === user.id) ? styles.likeClicked : styles.actionBtn} >
                                <div><i className="fa-regular fa-thumbs-up"></i></div>
                                <div>Like</div>
                            </span>
                        </button>

                        <button className={styles.actionBtnWrapper}>
                            <span className={styles.actionBtn}>
                                <div><i className="fa-regular fa-message"></i></div>
                                <div>Comment</div>
                            </span>
                        </button>
                    </div>

                    <div>
                        {post.comments.length ? post.comments.map((comment, i) =>
                            <div key={i} className={styles.comments}>
                                <div className={styles.userImageSmall}>
                                    <img src={`${comment.user.profile_picture_url}`} alt='profile' className={styles.userImageSmall} />
                                </div>
                                <div className={styles.commentBody}>
                                    <div className={styles.username}> {comment.user.username} </div>
                                    <div className={styles.body}> {comment.body} </div>
                                </div>
                                <div className={styles.commentEllipsis}>
                                    {comment.user_id === user.id ? <CommentEllipsis comment={comment} /> : null}
                                </div>
                                <div id='editComment' className={editComment && editComment.id === comment.id ? styles.showEditComment : styles.hideEditComment}>
                                    {<EditCommentForm comment={comment} />}
                                </div>
                            </div>) : null}
                    </div>

                    <div className={styles.commentForm}>
                        <div className={styles.userImageSmall}>
                            <img src={`${user.profile_picture_url}`} alt='profile' className={styles.userImageSmall} />
                        </div>
                        <CommentForm post={post} />
                    </div>
                </div>
            </div>
        )}
        </div >
    );
};

export default AllPosts;
