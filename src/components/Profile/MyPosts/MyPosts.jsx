import React from 'react';
import style from './MyPosts.module.css';
import Post from '../MyPosts/Post/Post';
import PostReduxForm from "./Post/PostForm";

const MyPosts = (props) => {

    let postsOnWall = props.posts.map((post) => {
        return (
            <Post postText={post.postText} likeCounter={post.likeCounter}/>
        )
    });

    const addPost = (values) => {
        props.addPost(values.postText);

    };

    return (
        <div className={style.content}>
            <h3>
                My posts
            </h3>
            <div>
                <PostReduxForm onSubmit={addPost}/>
            </div>

            {postsOnWall}

        </div>
    )
};

export default MyPosts;