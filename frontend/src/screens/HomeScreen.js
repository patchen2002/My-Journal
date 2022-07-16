import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function HomeScreen() {
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    return (
        <div>
            <header className="row">
                <div>
                    <Link className="brandTitle" to="/">My Journal</Link>
                    {
                        userInfo ? (
                            <Link className="sharedEntries" to="/sharedEntries">Shared Entries</Link>
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
                        <div className="textbox">
                            <div className="align">
                                <h1>
                                    About
                                </h1>
                                <p>My Journal is the perfect place for you to start or continue
                                    journalling. Here, you can create journal entries, and then
                                    decide whether you want to keep them private or make them
                                    public. Other users can then interact with your shared entries.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-2">
                    <div className="content">
                        <div className="textbox">
                            <div className="align">
                                <h1>
                                    Shared Entries
                                </h1>
                                <a href="">
                                    <img className="frontPic" src="../images/Journal-Book.jpg" alt="Journal graphic"></img>
                                </a>
                                <p>
                                    Browse some shared entries from our users!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <footer className="row center">
                Designed and coded by Patrick Chen
            </footer>
        </div>
    )
}