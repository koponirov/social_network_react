import React from 'react';
import store from "./redux/State";
import ReactDOM from 'react-dom';
import './index.css';
import App from "./App";



export let rerenderEntireTree = () => {

    ReactDOM.render(<App state={store.getState()}
                         addPost={store.addPost}
                         updateText={store.updateText}
                         sendMessage={store.sendMessage}
                         writeMessage={store.writeMessage}
    />, document.getElementById('root'));

};

rerenderEntireTree(store.getState());

store.subscribe(rerenderEntireTree);










