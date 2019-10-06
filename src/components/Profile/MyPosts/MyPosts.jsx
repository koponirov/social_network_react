import React from 'react';
import s from './MyPosts.module.css';
import Post from '../MyPosts/Post/Post';

const MyPosts = () => {
    return (
        <div className={s.content}>
            <div>
                My posts
            </div>
            <div>
                <textarea></textarea>
                <button>add post</button>
            </div>
            <Post />
            <Post />
            <Post />

        </div>
    )
}

export default MyPosts;