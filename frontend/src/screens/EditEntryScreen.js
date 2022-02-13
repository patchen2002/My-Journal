import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, getPost, patchPost } from '../actions/postActions';
import MessageBox from '../components/MessageBox';

export default function EditEntryScreen() {
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    const onePost = useSelector((state) => state.onePost);
    const { loading, error, foundPost } = onePost;

    const [textBody, setTextBody] = useState('');
    const [title, setTitle] = useState('');
    const [shared, setShared] = useState('');

    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        console.log(shared);
        dispatch(patchPost(foundPost._id, userInfo._id, textBody, title, shared));
        window.location.replace("http://localhost:3001/personalEntries")
    }
    const submitHandler2 = (e) => {
        e.preventDefault();
        dispatch(deletePost(foundPost._id));
        window.location.replace("http://localhost:3001/personalEntries")
    }
    useEffect(() => {
        dispatch(getPost(window.location.href.slice(window.location.href.indexOf("/", window.location.href.indexOf("editEntry")) + 1)));
        do {

        } while (loading);
        console.log(foundPost);
    }, [])
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
                            <p></p>
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
                    {
                        loading ? (<p></p>)
                            : error ?
                                (<MessageBox variant="danger">{error}</MessageBox>)
                                : (
                                    <div>
                                        <h1 className="pent-header">Edit Entry</h1>
                                        <form className="postForm" onSubmit={submitHandler}>
                                            <div className="textEntries">
                                                <h2>Title</h2>
                                                <input type="string" className="titleInput" defaultValue={foundPost.title} placeholder="Enter Title" required onChange={(e) => setTitle(e.target.value)}></input>
                                                <br></br>
                                                <h2>Entry</h2>
                                                <textarea type="string" className="entryInput" defaultValue={foundPost.textBody} placeholder="Enter Entry" required onChange={(e) => setTextBody(e.target.value)}></textarea>
                                            </div>
                                            <div className="bottomEntry">
                                                <h3>Shared:</h3>
                                                <div className="radioTable">
                                                    <div className="radioCenter">
                                                        <div className="radioEntry">
                                                            <input type="radio" id="publicShare" name="shared" value="true" onChange={(e) => setShared(e.target.value)}></input>
                                                            <label htmlFor="publicShare">Yes</label>
                                                            <input type="radio" id="privateShare" name="shared" value="false" onChange={(e) => setShared(e.target.value)}></input>
                                                            <label htmlFor="privateShare">No</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <button className="newEntry black post" type="submit">Submit</button>
                                            </div>
                                        </form>
                                        <form className="deleteButton" onSubmit={submitHandler2}>
                                            <button className="deleteButton" type="submit">Delete</button>
                                        </form>
                                    </div>)}
                </div>
            </main>
            <footer className="row center">
                Designed and coded by Patrick Chen
            </footer>
        </div>
    );
};