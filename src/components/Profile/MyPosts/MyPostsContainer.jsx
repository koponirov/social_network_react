import React from 'react';
import {addPostActionCreator, changeTextValueActionCreator} from "../../../redux/profileReducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";


let mapStateToProps=(state)=>{
    return {
        posts:state.profilePage.posts,
        newTextInPost:state.profilePage.newTextInPost
    }
};

let mapDispatchToProps=(dispatch)=>{
    debugger;
    return {
        addPost:()=>{
            debugger;
            dispatch(addPostActionCreator())
        },
        changeText:(text)=>{

            dispatch(changeTextValueActionCreator(text))
        }
    }
}

const MyPostsContainer=connect(mapStateToProps,mapDispatchToProps)(MyPosts);

export default MyPostsContainer;