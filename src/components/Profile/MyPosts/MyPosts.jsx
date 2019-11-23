import React from 'react';
import style from './MyPosts.module.css';
import Post from '../MyPosts/Post/Post';
import {addPostActiveCreator, changeTextValueActiveCreator} from "../../../redux/profileReducer";



const MyPosts = (props) => {

    let postsOnWall = props.state.posts.map((post) => {
        return (
            <Post message={post.messageText} likeCounter={post.likeCounter}/>
        )
    })

    let newPostText=React.createRef();

    let addPost= ()=>{

        props.dispatch(addPostActiveCreator());
        }

    let changeTextValue= ()=> {

        let text=newPostText.current.value;
        let action=changeTextValueActiveCreator(text)
        props.dispatch(action );


    }

    return (
        <div className={style.content}>
            <h3>
                My posts
            </h3>
            <div>
                <div>
                    <textarea ref={newPostText} value={props.state.newTextInPost} onChange={changeTextValue}></textarea>
                </div>
                <button onClick={ addPost} >add post</button>
            </div>

            {postsOnWall}

        </div>
    )
}

export default MyPosts;