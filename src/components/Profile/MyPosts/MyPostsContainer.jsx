import React from 'react';
import {addPost, changeText} from "../../../redux/profileReducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";


let mapStateToProps=(state)=>{
    return {
        posts:state.profilePage.posts,
        newTextInPost:state.profilePage.newTextInPost
    }
};

const MyPostsContainer=connect(mapStateToProps,{addPost,changeText})(MyPosts);

export default MyPostsContainer;