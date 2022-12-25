import React from 'react';
import { useDispatch } from 'react-redux';
import { Modal } from '../../../context/Modal';
import EditPostForm from './EditPostForm';
import { setEditPostModal } from '../../../store/ui';

const EditPostFormModal = ({ post }) => {
    const dispatch = useDispatch();
    return (
        <Modal onClose={() => dispatch(setEditPostModal(false))}>
            <EditPostForm post={post} />
        </Modal >
    );
};

export default EditPostFormModal;
