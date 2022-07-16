import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { editUser } from '../actions/userActions';

export default function ProfileScreen() {
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const submitHandler1 = (e) => {
        e.preventDefault();
        dispatch(editUser(email, username, password));
    }
    return (
        <div>
            <header className="row">
                <div>
                    <Link className="brandTitle" to="/">My Journal</Link>
                    {
                        userInfo ? (
                            <Link className="sharedEntries" to="/sharedentries">Shared Entries</Link>
                        ) : (
                            <Link className="sharedEntries" to="/signin">Shared Entries</Link>
                        )
                    }
                    {
                        userInfo ? (
                            <Link className="personalEntries" to="/personalEntries">Personal Entries</Link>
                        ) : (
                            <></>
                        )
                    }
                </div>
                {
                    userInfo ? (
                        <form action="/profile">
                            <button className="join">{userInfo.username}</button>
                        </form>
                    ) : (
                        <form action="/signin">
                            <button className="join">Sign Up/Log In</button>
                        </form>
                    )
                }
            </header>
            <main className="row top">
                <div className="col-1">
                    <div className="content">
                        <div className="textbox profile">
                            <div className="align profile">
                                <h1>
                                    Edit My Profile
                                </h1>
                                <form className="form" onSubmit={submitHandler1}>
                                    <span>
                                        Email:
                                    </span>
                                    <input type="email" placeholder='Edit Email' required onChange={(e) => setEmail(e.target.value)}></input>
                                    <br></br><br></br>
                                    <span>
                                        Username:
                                    </span>
                                    <input type="text" placeholder='Edit Username' required onChange={(e) => setUsername(e.target.value)}></input>
                                    <br></br><br></br>
                                    <span>
                                        Password:
                                    </span>
                                    <input type="password" placeholder='Edit Password' required onChange={(e) => setPassword(e.target.value)}></input>
                                    <br></br><br></br>
                                    <button className="editUser" type="submit">Confirm Edits</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <footer className="row center">
                Designed and coded by Patrick Chen
            </footer>
        </div>
    );
};