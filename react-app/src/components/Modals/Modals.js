import { useSelector } from 'react-redux';
import CreatePostFormModal from './CreatePostFormModal/CreatePostFormModal';
import SignUpFormModal from './SignUpFormModal/SignUpFormModal';
import EditPostFormModal from './EditPostFormModal/EditPostFormModal';
import DeletePostFormModal from './DeletePostFormModal/DeletePostFormModal';
import DeleteCommentFormModal from './DeleteCommentFormModal /DeleteCommentFormModal ';


export default function Modals({ post }) {
    const ui = useSelector(state => state.ui);
    return <>
        {ui.showSignUpModal && <SignUpFormModal />}
        {ui.showCreatePostModal && <CreatePostFormModal />}
        {ui.showEditPostModal && <EditPostFormModal post={post} />}
        {ui.showDeletePostModal && <DeletePostFormModal post={post} />}
        {ui.showDeleteCommentModal && <DeleteCommentFormModal />}
    </>;
}
