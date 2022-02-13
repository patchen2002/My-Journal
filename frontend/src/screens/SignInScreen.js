import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { newUser, signin } from '../actions/userActions';
import MessageBox from "../components/MessageBox"

export default function SignInScreen() {
    const userSignin = useSelector((state) => state.userSignin);
    const { error, userInfo } = userSignin;

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const submitHandler1 = (e) => {
        e.preventDefault();
        dispatch(signin(email, password));
    }
    const submitHandler2 = (g) => {
        g.preventDefault();
        dispatch(newUser(email, username, password));
    }
    useEffect(() => {
        if (userInfo) {
            window.location.replace("http://localhost:3001/personalEntries")
        };
    });

    return (
        <div>
            <header className="row">
                <div>
                    <Link className="brandTitle" to="/">My Journal</Link>
                    <Link className="sharedEntries" to="/signin">Shared Entries</Link>
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
                {error ? (<MessageBox variant="danger">{error}</MessageBox>)
                    : (
                        <div className="col-1">
                            <div className="content">
                                <div className="loginbox">
                                    <div className="align">
                                        <h1>Log In</h1>
                                        <br></br><br></br>
                                        <form action="/profile" className="form" onSubmit={submitHandler1}>
                                            <span>
                                                Email:
                                            </span>
                                            <input type="email" required onChange={(e) => setEmail(e.target.value)}></input>
                                            <br></br><br></br>
                                            <span>
                                                Password:
                                            </span>
                                            <input type="password" required onChange={(e) => setPassword(e.target.value)}></input>
                                            <br></br><br></br>
                                            <button className="newEntry black" type="submit">Submit</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>)}
                {error ? (<MessageBox variant="danger">{error}</MessageBox>)
                    : (
                        <div className="col-2">
                            <div className="content">
                                <div className="signupbox">
                                    <div className="align">
                                        <form action="/profile" className="form" onSubmit={submitHandler2}>
                                            <h1>
                                                Sign Up
                                            </h1>
                                            <span>
                                                Email:
                                            </span>
                                            <input type="email" required onChange={(g) => setEmail(g.target.value)}></input>
                                            <br></br><br></br>
                                            <span>
                                                Username:
                                            </span>
                                            <input type="text" required onChange={(g) => setUsername(g.target.value)}></input>
                                            <br></br><br></br>
                                            <span>
                                                Password:
                                            </span>
                                            <input type="password" required onChange={(g) => setPassword(g.target.value)}></input>
                                            <br></br><br></br>
                                            <button className="newEntry black" type="submit">Submit</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>)}
            </main>
            <footer className="row center">
                Designed and coded by Patrick Chen
            </footer>
        </div>
    )
}