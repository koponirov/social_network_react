import React from 'react';
import style from './MyPosts.module.css';
import Post from '../MyPosts/Post/Post';

const MyPosts = (props) => {


    let postsOnWall = props.state.posts.map((post) => {
        return (
            <Post message={post.messageText} likeCounter={post.likeCounter}/>
        )
    })

    let newPostText=React.createRef();

    let addPost= ()=>{

        let text=newPostText.current.value;
        props.addPost(text);
        }



    return (
        <div className={style.content}>
            <h3>
                My posts
            </h3>
            <div>
                <div>
                    <textarea ref={newPostText}></textarea>
                </div>
                <button onClick={ addPost} >add post</button>
            </div>

            {postsOnWall}

        </div>
    )
}

export default MyPosts;