import React from 'react';

export default function PostBox(props) {
    const { post } = props;

    return (
        <div key={post._id} className="margin">
            <a href={`editEntry/${post._id}`}>
                <div className="postbox">
                    <img className="entryGraphic" src="../images/writing-icon.jpg" alt="Writing Graphic"></img>
                    <div className="previewText">
                        <h1>{post.title}</h1>
                        <p>Date: {post.timestamp.slice(0, post.timestamp.indexOf("T"))}</p>
                        <p>Time: {post.timestamp.slice(post.timestamp.indexOf("T") + 1, post.timestamp.indexOf("."))}</p>
                    </div>
                </div>
            </a>
        </div>
    )
};