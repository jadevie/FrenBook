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
                    <select name='month' onChange={e => setMonth(e.target.value)} value={month}>
                        {months.map((month, i) =>
                            <option
                                key={i}
                                value={Object.keys(month)[0]}>{Object.values(month)[0]}
                            </option>
                        )}
                    </select>
                    <select name='day' onChange={e => setDay(e.target.value)} value={day}>
                        {days.map((day, i) =>
                            <option
                                key={i}
                                value={day}>{day}</option>
                        )}
                    </select>
                    <select name='year' onChange={e => setYear(e.target.value)} value={year}>
                        {years.map((year, i) =>
                            <option
                                key={i}
                                value={year}>{year}</option>
                        )}
                    </select>
                </div>
                <div>
                    <label>Gender</label>
                    <label>Female
                        <input
                            type='radio'
                            name='gender'
                            onChange={e => setGender(e.target.value)}
                            value={gender} />
                    </label>

                    <label>Male
                        <input
                            type='radio'
                            name='gender'
                            onChange={e => setGender(e.target.value)}
                            value={gender} />
                    </label>
                    <label>
                        <input
                            placeholder='Custom'
                            type='text'
                            name='gender'
                            onChange={e => setGender(e.target.value)
                            }
                            value={gender}>
                        </input>
                    </label>
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
