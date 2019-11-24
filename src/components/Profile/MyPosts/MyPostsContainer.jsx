import React from 'react';
import {addPostActiveCreator, changeTextValueActiveCreator} from "../../../redux/profileReducer";
import MyPosts from "./MyPosts";



const MyPostsContainer = (props) => {

    let state=props.store.getState();

    let addPost= ()=>{

        props.store.dispatch(addPostActiveCreator());
        }

    let changeText= (text)=> {

        let action=changeTextValueActiveCreator(text)
        props.store.dispatch(action );


    }

    return (
        <MyPosts addPost={addPost}
                 changeText={changeText}
                 newTextInPost={state.profilePage.newTextInPost}
                 posts={state.profilePage.posts} />
        )
}

export default MyPostsContainer;