import styles from './LoginForm.module.css';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { logIn } from '../../../store/session';
import { setSignUpModal } from '../../../store/ui';
import { getPosts } from '../../../store/posts';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    await dispatch(logIn({ email, password }))
      .catch(e => {
        setErrors(e.errors);
      })
      .then(() => {
        dispatch(getPosts());
      });
  };

  if (user) return <Redirect to='/' />;

  return (
    <>
      <div>
        <form onSubmit={onLogin} className={styles.wrapper}>
          <div>
            <input className={styles.input}
              type='text'
              placeholder='Email'
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input className={styles.input}
              type='password'
              placeholder='Password'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button type='submit' className={styles.loginBtn}>Login</button>
          </div>
          <div className={styles.errors}>
            {errors.length > 0 && errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div className={styles.line}></div>
          <div>
            <button className={styles.signupBtn} onClick={() => dispatch(setSignUpModal(true))}>
              Create new account
            </button>
          </div>
        </form>
      </div >
    </>
  );
};

export default LoginForm;
