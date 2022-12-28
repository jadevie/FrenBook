import React from 'react';
import { useDispatch } from 'react-redux';
import { Modal } from '../../../context/Modal';
import { setDeleteCommentModal } from '../../../store/ui';
import DeleteCommentForm from './DeleteCommentForm';


const DeleteCommentFormModal = () => {
    const dispatch = useDispatch();
    return (
        <Modal onClose={() => dispatch(setDeleteCommentModal(false))}>
            <DeleteCommentForm />
        </Modal>
    );
};

export default DeleteCommentFormModal;
