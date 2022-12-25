// import styles from './SignUpForm.module.css';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signUp } from '../../../store/session';
import { setSignUpModal } from '../../../store/ui';

const SignUpForm = () => {
    const [errors, setErrors] = useState([]);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('');
    const [birthday, setBirthday] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const onSignUp = async (e) => {
        e.preventDefault();
        if (password === repeatPassword) {
            await dispatch(signUp(firstName, lastName, username, email, password, gender, birthday))
                .then(() => dispatch(setSignUpModal(false)))
                .catch(e => {
                    const errors = e.errors;
                    setErrors(errors);
                });
        }
    };

    if (user) return <Redirect to='/' />;

    return (
        <>
            <form onSubmit={onSignUp}>
                <div>
                    {errors.length > 0 && errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>
                <div>
                    <label>Username </label>
                    <input
                        type='text'
                        name='username'
                        onChange={e => setUsername(e.target.value)}
                        value={username}
                    ></input>
                </div>
                <div>
                    <label>Email</label>
                    <input
                        type='text'
                        name='email'
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                    ></input>
                </div>
                <div>
                    <label>First Name</label>
                    <input
                        type='text'
                        name='firstName'
                        onChange={e => setFirstName(e.target.value)}
                        value={firstName}
                    ></input>
                </div>
                <div>
                    <label>Last Name</label>
                    <input
                        type='text'
                        name='lastName'
                        onChange={e => setLastName(e.target.value)}
                        value={lastName}
                    ></input>
                </div>
                <div>
                    <label>Birthday</label>
                    <input
                        type='text'
                        name='birthday'
                        onChange={e => setBirthday(e.target.value)}
                        value={birthday}
                    ></input>
                </div>
                <div>
                    <label>Gender</label>
                    <input
                        type='text'
                        name='gender'
                        onChange={e => setGender(e.target.value)}
                        value={gender}
                    ></input>
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type='password'
                        name='password'
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                    ></input>
                </div>
                <div>
                    <label>Repeat Password</label>
                    <input
                        type='password'
                        name='repeat_password'
                        onChange={e => setRepeatPassword(e.target.value)}
                        value={repeatPassword}
                        required={true}
                    ></input>
                </div>
                <button type='submit'>Sign Up</button>
            </form >
        </>
    );
};

export default SignUpForm;
