import styles from './LoginForm.module.css';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logIn } from '../../../store/session';
import { setSignUpModal } from '../../../store/ui';


const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    await dispatch(logIn({ email, password }))
      .catch(e => {
        setErrors(e.errors);
      });
  };

  return (
    <>
      <div className={styles.wrapper}>
        <form onSubmit={onLogin} >
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
          <button type="submit" className={styles.demoUser} onClick={() => {
            setEmail("demo@aa.io");
            setPassword("password");
          }}>Log in as demo user
          </button>
          <div className={styles.errors}>
            {errors.length > 0 && errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
        </form>
        <div className={styles.line}></div>
        <div>
          <button className={styles.signupBtn} onClick={() => dispatch(setSignUpModal(true))}>
            Create new account
          </button>
        </div>
      </div >
    </>
  );
};

export default LoginForm;
