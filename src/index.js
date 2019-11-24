import React from 'react';
import store from "./redux/reduxStore";
import ReactDOM from 'react-dom';
import './index.css';
import App from "./App";


export let rerenderEntireTree = () => {

    ReactDOM.render(<App store={store}
                         dispatch={store.dispatch.bind(store)}
    />, document.getElementById('root'));

};

rerenderEntireTree(store.getState());

store.subscribe(rerenderEntireTree);










