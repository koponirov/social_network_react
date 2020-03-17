import {dialogsAPI} from "../api/api";
import {reset} from 'redux-form';


const SET_DIALOGS = 'SET_DIALOGS';
const SET_MESSAGES = 'SET_MESSAGES';
const SET_CURRENT_USER = 'SET_CURRENT_USER';
const SEND_MESSAGE = 'SEND_MESSAGE';
const CREATE_DIALOG = 'CREATE_DIALOG';

let initialState = {
    dialogs: [],
    messages: [],
    currentUser: null
};

const dialogsReducer = (state = initialState, action) => {

    switch (action.type) {

        case SET_DIALOGS :
            return {
                ...state,
                dialogs: [...action.dialogs]
            };
        case SET_MESSAGES :
            return {
                ...state,
                messages: [...action.messages]
            };
        case SET_CURRENT_USER :
            return {
                ...state,
                currentUser: action.user
            };
        case SEND_MESSAGE :
            return {
                ...state,
                messages: [...state.messages, ...action.message]
            };
        case CREATE_DIALOG :
            if (state.dialogs.length) {
                return {
                    ...state,
                    dialogs: [...state.dialogs, ...action.user]
                };
            } else {
                return {
                    ...state,
                    dialogs: [...action.user]
                };
            }
        default:
            return state;
    }
};

export const setDialogs = (dialogs) => ({type: SET_DIALOGS, dialogs});
export const setMessages = (messages) => ({type: SET_MESSAGES, messages});
export const setCurrentUser = (user) => ({type: SET_CURRENT_USER, user});
export const sendMessage = (message) => ({type: SEND_MESSAGE, message});
export const createDialog = (user) => ({type: CREATE_DIALOG, user});



export const requestDialogs = () => async (dispatch) => {

    let response = await dialogsAPI.getDialogs()
    dispatch(setDialogs(response.data));
}

export const startChatting= (userId) => async (dispatch) => {
debugger
    let response = await dialogsAPI.startChatting(userId)

}



export const requestMessages = (userId) => async (dispatch) => {

    dispatch(setCurrentUser(userId))
    let response = await dialogsAPI.getDialogWithUser(userId)
    let messages = response.data.items
    dispatch(setMessages(messages));
}

export const sendNewMessage = (userId, message) => async (dispatch) => {

    const response = await dialogsAPI.sendMessage(userId, message);
    if (response.data.resultCode === 0) {
        let response = await dialogsAPI.getDialogWithUser(userId)
        let messages = response.data.items
        dispatch(setMessages(messages));
        dispatch(reset('message'))
    }
}





export default dialogsReducer;