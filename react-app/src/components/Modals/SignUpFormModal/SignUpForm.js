import styles from './SignUpForm.module.css';
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
    const [month, setMonth] = useState('01');
    const [day, setDay] = useState('1');
    const [year, setYear] = useState('2022');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const onSignUp = async (e) => {
        const birthday = `${year}-${month}-0${day}`;
        e.preventDefault();
        if (password === repeatPassword) {
            await dispatch(signUp(firstName, lastName, username, email, password, gender, birthday))
                .then(() => dispatch(setSignUpModal(false)))
                .catch(e => {
                    const errors = e.errors;
                    setErrors(errors);
                });
        }
        if (user) return <Redirect to='/' />;
    };

    const months = [{ '01': 'Jan' }, { '02': 'Feb' }, { '03': 'Mar' }, { '04': 'Apr' }, { '05': 'May' }, { '06': 'Jun' }, { '07': 'Jul' }, { '08': 'Aug' }, { '09': 'Sep' }, { '10': 'Oct' }, { '11': 'Nov' }, { '12': 'Dec' }];

    const days = [...Array(31).keys()].map(index => index + 1);

    const years = [...Array(118).keys()].map(index => index + 1905).sort((a, b) => b - a);



    return (
        <>
            <div className={styles.wrapper}>
                <h3>Sign Up</h3>
                <p>It's quick and easy.</p>
                <form onSubmit={onSignUp} className={styles.form}>
                    <div>
                        {errors.length > 0 && errors.map((error, ind) => (
                            <div key={ind}>{error}</div>
                        ))}
                    </div>
                    <div className={styles.splitInput}>
                        <div>
                            <input
                                type='text'
                                placeholder='First Name'
                                name='firstName'
                                onChange={e => setFirstName(e.target.value)}
                                value={firstName}
                                required={true}
                                className={styles.input}
                            ></input>
                        </div>
                        <div>
                            <input
                                type='text'
                                placeholder='Last Name'
                                name='lastName'
                                onChange={e => setLastName(e.target.value)}
                                value={lastName}
                                required={true}
                                className={styles.input}
                            ></input>
                        </div>
                    </div>
                    <div>
                        <input
                            type='text'
                            name='username'
                            placeholder='Username'
                            onChange={e => setUsername(e.target.value)}
                            value={username}
                            required={true}
                            className={styles.input}
                        />
                    </div>
                    <div>
                        <input
                            type='text'
                            name='email'
                            placeholder='Email'
                            onChange={e => setEmail(e.target.value)}
                            value={email}
                            required={true}
                            className={styles.input}
                        ></input>
                    </div>

                    <div className={styles.birthday}>
                        <label style={{ fontSize: '12px' }}>Birthday</label>
                        <div className={styles.daySelection}>
                            <select name='month' onChange={e => setMonth(e.target.value)} value={month} className={styles.input}>
                                {months.map((month, i) =>
                                    <option
                                        key={i}
                                        value={Object.keys(month)[0]}>{Object.values(month)[0]}
                                    </option>
                                )}
                            </select>
                            <select name='day' onChange={e => setDay(e.target.value)} value={day} className={styles.input}>
                                {days.map((day, i) =>
                                    <option
                                        key={i}
                                        value={day}>{day}</option>
                                )}
                            </select>
                            <select name='year' onChange={e => setYear(e.target.value)} value={year} className={styles.input}>
                                {years.map((year, i) =>
                                    <option
                                        key={i}
                                        value={year}>{year}</option>
                                )}
                            </select>
                        </div>
                    </div>

                    <div className={styles.gender}>
                        <label style={{ fontSize: '12px' }}>Gender</label>
                        <div className={styles.genderSelection}>
                            <label className={styles.input}>
                                Female
                                <input
                                    type='radio'
                                    name='gender'
                                    onChange={e => setGender(e.target.value)}
                                    value={gender}
                                    className={styles.radio}
                                />
                            </label>
                            <label className={styles.input}>
                                Male
                                <input
                                    type='radio'
                                    name='gender'
                                    onChange={e => setGender(e.target.value)}
                                    value={gender}
                                    className={styles.radioM}
                                />
                            </label>
                            <input
                                placeholder='Custom'
                                type='text'
                                name='gender'
                                onChange={e => setGender(e.target.value)
                                }
                                value={gender}
                                className={styles.input}
                            />
                        </div>
                    </div>
                    <div>
                        <input
                            placeholder='New Password'
                            type='password'
                            name='password'
                            onChange={e => setPassword(e.target.value)}
                            value={password}
                            className={styles.input}
                        />
                    </div>
                    <div>
                        <input
                            type='password'
                            placeholder='Repeat Password'
                            name='repeat_password'
                            onChange={e => setRepeatPassword(e.target.value)}
                            value={repeatPassword}
                            required={true}
                            className={styles.input}
                        />
                    </div>
                    <button type='submit' className={styles.signupBtn}>Sign Up</button>
                </form >
            </div>
        </>
    );
};

export default SignUpForm;
