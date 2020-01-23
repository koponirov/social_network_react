import React from 'react';
import style from './MyPosts.module.css';
import Post from '../MyPosts/Post/Post';
import PostReduxForm from "./Post/PostForm";

const MyPosts = (props) => {

    let postsOnWall = props.posts.map((post) => {
        return (


            <Post message={post.messageText} likeCounter={post.likeCounter}/>
        )
    })

    let onAddPost = () => {

        props.addPost();
    }

    let onChangeText = (newPostText) => {

        let text = newPostText.target.value;
        props.changeText(text);
    }

    const onSubmit = (formData) => {
        console.log(formData)
    }

    return (
        <div className={style.content}>
            <h3>
                My posts
            </h3>
            <div>
                <PostReduxForm onSubmit={onSubmit}/>
            </div>

            {postsOnWall}

        </div>
    )
}

export default MyPosts;