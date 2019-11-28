import React from 'react';
import {addPostActiveCreator, changeTextValueActiveCreator} from "../../../redux/profileReducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";


let mapStateToProps=(state)=>{
    return {
        posts:state.profilePage.posts,
        newTextInPost:state.profilePage.newTextInPost
    }
};

let mapDispatchToProps=(dispatch)=>{
    return {
        addPost:()=>{
            dispatch(addPostActiveCreator())
        },
        changeText:(text)=>{
            dispatch(changeTextValueActiveCreator(text))
        }
    }
}

const MyPostsContainer=()=>connect(mapStateToProps,mapDispatchToProps)(MyPosts);

export default MyPostsContainer;