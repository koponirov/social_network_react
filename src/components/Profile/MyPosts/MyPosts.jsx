import React from 'react';
import style from './MyPosts.module.css';
import Post from '../MyPosts/Post/Post';



const MyPosts = (props) => {

    let postsOnWall = props.posts.map((post) => {
        return (
            <Post message={post.messageText} likeCounter={post.likeCounter}/>
        )
    })

    

    let onAddPost= ()=>{
        debugger;
        props.addPost();
        }

    let onChangeText= (newPostText)=> {

        let text=newPostText.target.value;
        props.changeText(text);
    }

    return (
        <div className={style.content}>
            <h3>
                My posts
            </h3>
            <div>
                <div>
                    <textarea  value={props.newTextInPost} onChange={onChangeText}></textarea>
                </div>
                <button onClick={ onAddPost} >add post</button>
            </div>

            {postsOnWall}

        </div>
    )
}

export default MyPosts;