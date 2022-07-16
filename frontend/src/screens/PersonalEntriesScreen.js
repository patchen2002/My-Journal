import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PostBox from '../components/PostBox';
import MessageBox from '../components/MessageBox';
import { getAllPosts } from '../actions/postActions';

export default function PersonalEntriesScreen() {
    const userSignin = useSelector((state) => state.userSignin);
    const { loading, error, userInfo } = userSignin;

    const postList = useSelector((state) => state.postList);
    const { posts } = postList;

    const dispatch = useDispatch();
    useEffect(() => {
        if (!userInfo) {
            window.location.replace("http://localhost:3001/signin")
        };
        dispatch(getAllPosts(userInfo._id));
    }, []);

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
            <h1 className="pent-header">Personal Entries</h1>
            <main className="row top">
                {
                    loading ? (<p></p>)
                        : error ?
                            (<MessageBox variant="danger">{error}</MessageBox>)
                            : (
                                <div className="col-1 entries">
                                    {
                                        posts?.map((post) => (
                                            <PostBox key={post._id} post={post}></PostBox>
                                        ))
                                    }
                                </div>)
                }
            </main>
            <div className="positioned">
                <form action="/newEntry">
                    <button type="submit" className="newEntry">New Entry</button>
                </form>
            </div>
            <footer className="row center">
                Designed and coded by Patrick Chen
            </footer>
        </div>
    );
};