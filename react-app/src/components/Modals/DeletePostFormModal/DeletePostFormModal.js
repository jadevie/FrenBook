import React from 'react';
import { useDispatch } from 'react-redux';
import { Modal } from '../../../context/Modal';
import { setDeletePostModal } from '../../../store/ui';
import DeletePostForm from './DeletePostForm';


const DeletePostFormModal = () => {
    const dispatch = useDispatch();
    return (
        <Modal onClose={() => dispatch(setDeletePostModal(false))}>
            <DeletePostForm />
        </Modal>
    );
};

export default DeletePostFormModal;
