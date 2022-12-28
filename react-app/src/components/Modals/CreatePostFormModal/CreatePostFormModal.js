import React from 'react';
import { useDispatch } from 'react-redux';
import { Modal } from '../../../context/Modal';
import CreatePostForm from './CreatePostForm';
import { setCreatePostModal } from '../../../store/ui';

const CreatePostFormModal = () => {
    const dispatch = useDispatch();
    return (
        <Modal onClose={() => dispatch(setCreatePostModal(false))}>
            <CreatePostForm />
        </Modal >
    );
};

export default CreatePostFormModal;
