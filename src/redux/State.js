import React from 'react';


const ADD_POST = 'ADD_POST';

const UPDATE_TEXT = 'UPDATE_TEXT';

const SEND_MESSAGE = 'SEND_MESSAGE';

const WRITE_MESSAGE = 'WRITE_MESSAGE';

let store = {
    _state : {
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
    },
    getState() {
        return this._state;
    },
    _callSubscriber() {
        console.log ('State changed');
    },
    subscribe(observer) {
        this._callSubscriber=observer;
    },
    dispatch(action) {
        if (action.type===UPDATE_TEXT) {
            this._state.profilePage.newTextInPost=action.newText;
            this._callSubscriber(this._state);
        } else if (action.type===ADD_POST){
            let newPost={
                userId:6,
                messageText:this._state.profilePage.newTextInPost,
                likeCounter:0
            };
            this._state.profilePage.posts.push(newPost);
            this._state.profilePage.newTextInPost='';
            this._callSubscriber(this._state);
        } else if (action.type===SEND_MESSAGE) {
            let newMessage= {
                messageText: this._state.dialogsPage.newMessageText
            };

            this._state.dialogsPage.messages.push(newMessage);
            this._state.dialogsPage.newMessageText='';
            this._callSubscriber(this._state);
        } else if (action.type===WRITE_MESSAGE) {
            this._state.dialogsPage.newMessageText=action.newText;
            this._callSubscriber(this._state);
        }
    }
    ,
};

export const addPostActiveCreator=()=>({type:ADD_POST});

export const changeTextValueActiveCreator=(text)=>{

    return (
        {type:UPDATE_TEXT,newText:text}
    )
};

export const sendMessageActionCreator=()=>{

    return (
        {type:SEND_MESSAGE}
    )
};

export const onMessageChangeActionCreator=(text)=>{

    return (
        {type:WRITE_MESSAGE,newText: text}
    )
}






export default store;

window.store=store;