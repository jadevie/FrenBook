import React from 'react';
import { useDispatch } from 'react-redux';
import { logOut } from '../../store/session';

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logOut());
  };

  return <button onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
