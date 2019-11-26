import React from 'react';
import store from "./redux/reduxStore";
import ReactDOM from 'react-dom';
import './index.css';
import App from "./App";
import {BrowserRouter} from "react-router-dom";
import StoreContext from './StoreContext'


export let rerenderEntireTree = () => {

    ReactDOM.render(
        <BrowserRouter>
            <StoreContext.Provider value={store}>
        <App />
            </StoreContext.Provider>
        </BrowserRouter>, document.getElementById('root'));

};

rerenderEntireTree(store.getState());

store.subscribe(rerenderEntireTree);










