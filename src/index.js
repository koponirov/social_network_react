import React from 'react';
import store from "./redux/reduxStore";
import ReactDOM from 'react-dom';
import './index.css';
import App from "./App";
import {HashRouter} from "react-router-dom";
import {Provider} from "react-redux";

ReactDOM.render(
    <HashRouter >
        <Provider store={store}>
            <App/>
        </Provider>
    </HashRouter>, document.getElementById('root'));









