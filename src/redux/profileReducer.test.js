import profileReducer, {addPost, deletePost} from "./profileReducer";
import React from "react";

it('new post should be added', () => {

    //1. test data

    let action = addPost ('super-text');

    let state = {
        posts: [
            {userId: 1, postText: 'How r u?', likeCounter: 1},
            {userId: 2, postText: 'Hi!', likeCounter: 0},
            {userId: 3, postText: 'What?', likeCounter: 5},
        ]
    };


    //2.action

    let newState = profileReducer (state,action)

    //3.expectation

    expect (newState.posts.length).toBe(4)

});

it('text in post should be corrected', () => {

    //1. test data

    let action = addPost ('super-text');

    let state = {
        posts: [
            {userId: 1, postText: 'How r u?', likeCounter: 1},
            {userId: 2, postText: 'Hi!', likeCounter: 0},
            {userId: 3, postText: 'What?', likeCounter: 5},
        ]
    };


    //2.action

    let newState = profileReducer (state,action)

    //3.expectation

    expect (newState.posts[3].postText).toBe('super-text')

});


it('quantity of posts should be decrement', () => {

    //1. test data

    let action = deletePost (2);

    let state = {
        posts: [
            {userId: 1, postText: 'How r u?', likeCounter: 1},
            {userId: 2, postText: 'Hi!', likeCounter: 0},
            {userId: 3, postText: 'What?', likeCounter: 5},
        ]
    };


    //2.action

    let newState = profileReducer (state,action)

    //3.expectation

    expect (newState.posts.length).toBe(2)

});



