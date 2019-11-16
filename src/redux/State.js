import React from 'react';
import {rerenderEntireTree} from "../render";


let state = {
    dialogsPage: {
            dialogs: [
                {userId: 1, userName: 'Sasha'},
                {userId: 2, userName: 'Olga'},
                {userId: 3, userName: 'Nelli'},
                {userId: 4, userName: 'Igor'},
                {userId: 5, userName: 'Sergey'},
            ],
            messages: [
                {messageText: 'Hi!'},
                {messageText: 'How are u?'},
                {messageText: "I'm OK"},
                {messageText: 'What u want to do tomorrow?'},
                {messageText: 'Goodbye!'},
            ],
            newMessageText:'...'
        },
    profilePage: {
            posts:[
                {userId: 1, messageText: 'How r u?', likeCounter: 1},
                {userId: 2, messageText: 'Huston, we have a problem...', likeCounter: 25},
                {userId: 3, messageText: 'Hi!', likeCounter: 0},
                {userId: 4, messageText: 'What?', likeCounter: 5},
                {userId: 5, messageText: 'dsgdgsde!', likeCounter: 0},
            ],
            newTextInPost:'I\'m a new text!'

        }
}

export let addPost=()=>{

    let newPost={
        userId:6,
        messageText:state.profilePage.newTextInPost,
        likeCounter:0
    };
    state.profilePage.posts.push(newPost);
    state.profilePage.newTextInPost='';
    rerenderEntireTree(state);
};

export let updateText= (newText) => {

    state.profilePage.newTextInPost=newText;
    rerenderEntireTree(state);
};


export let sendMessage=()=>{

    let newMessage= {
        messageText: state.dialogsPage.newMessageText
    };

    state.dialogsPage.messages.push(newMessage);
    state.dialogsPage.newMessageText='';
    rerenderEntireTree(state);

    };

export let writeMessage= (newText) => {

    state.dialogsPage.newMessageText=newText;
    rerenderEntireTree(state);
};



export default state;