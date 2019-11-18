import React from 'react';
import state from "./redux/State";
import ReactDOM from 'react-dom';
import './index.css';
import App from "./App";
import {addPost, updateText, sendMessage, writeMessage,subscribe} from "./redux/State";


export let rerenderEntireTree = (state) => {

    ReactDOM.render(<App state={state}
                         addPost={addPost}
                         updateText={updateText}
                         sendMessage={sendMessage}
                         writeMessage={writeMessage}
    />, document.getElementById('root'));

};

rerenderEntireTree(state);

subscribe(rerenderEntireTree);










