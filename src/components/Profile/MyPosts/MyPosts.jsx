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
            <Post message='How r u?' likeCounter='1'/>
            <Post message='Huston, we have a problem...'likeCounter='25'/>
            <Post />

        </div>
    )
}

export default MyPosts;