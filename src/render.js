import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {addPost, sendMessage, updateText, writeMessage} from "./redux/State";

export let rerenderEntireTree=(state)=>{

    ReactDOM.render(<App state={state} addPost={addPost} updateText={updateText} sendMessage={sendMessage} writeMessage={writeMessage}/>, document.getElementById('root'));

};










