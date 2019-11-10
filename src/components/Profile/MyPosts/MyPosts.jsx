import React from 'react';
import style from './MyPosts.module.css';
import Post from '../MyPosts/Post/Post';

const MyPosts = () => {

    let postsData=[
        {userId: 1, messageText: 'How r u?', likeCounter:1},
        {userId: 2,messageText: 'Huston, we have a problem...', likeCounter:25},
        {userId: 3,messageText: 'Hi!', likeCounter:0},
        {userId: 4,messageText: 'What?', likeCounter:5},
        {userId: 5,messageText: 'dsgdgsde!', likeCounter:0},
        ]

    let postsOnWall=postsData.map( (post) => {
        return (
            <Post message={post.messageText} likeCounter={post.likeCounter}/>
        )
    })


    return (
        <div className={style.content}>
            <h3>
                My posts
            </h3>
            <div>
                <div>
                    <textarea></textarea>
                </div>
                <button>add post</button>
            </div>

            {postsOnWall}

        </div>
    )
}

export default MyPosts;