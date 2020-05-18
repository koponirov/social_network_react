import {dialogsAPI} from "../api/api";
import {reset} from 'redux-form';

const SET_DIALOGS = 'socialNetwork/dialogs/SET_DIALOGS';
const SET_MESSAGES = 'socialNetwork/dialogs/SET_MESSAGES';
const SET_NEWMESSAGES_COUNT = 'socialNetwork/dialogs/SET_NEWMESSAGES_COUNT';
const SET_CURRENT_USER = 'socialNetwork/dialogs/SET_CURRENT_USER';
const SEND_MESSAGE = 'socialNetwork/dialogs/SEND_MESSAGE';
const CREATE_DIALOG = 'socialNetwork/dialogs/CREATE_DIALOG';
const TOGGLE_IS_LOADING = 'socialNetwork/dialogs/TOGGLE_IS_LOADING';

let initialState = {
    dialogs: [],
    messages: [],
    newMessagesCount:null,
    currentUser: null,
    isLoading:false
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
        case TOGGLE_IS_LOADING:
            return {
                ...state,
                isLoading: action.isLoading
            }
        case SET_NEWMESSAGES_COUNT :
            return {
                ...state,
                newMessagesCount: action.number
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
export const setNewMessagesCount = (number) => ({type: SET_NEWMESSAGES_COUNT, number});
export const setCurrentUser = (user) => ({type: SET_CURRENT_USER, user});
export const sendMessage = (message) => ({type: SEND_MESSAGE, message});
export const createDialog = (user) => ({type: CREATE_DIALOG, user});
export const setIsLoading = (isLoading) => ({type: TOGGLE_IS_LOADING, isLoading});

export const requestDialogs = () => async (dispatch) => {
    let response = await dialogsAPI.getDialogs();
    dispatch(setDialogs(response.data));
};

export const startChatting = (userId) => async (dispatch) => {
    let response = await dialogsAPI.startChatting(userId)
};

export const requestMessages = (userId) => async (dispatch) => {
    dispatch(setIsLoading(true));
    dispatch(setCurrentUser(userId));
    let response = await dialogsAPI.getDialogWithUser(userId);
    let messages = response.data.items;
    dispatch(setMessages(messages));
    dispatch(setIsLoading(false))
};

export const sendNewMessage = (userId, message) => async (dispatch) => {

    const response = await dialogsAPI.sendMessage(userId, message);
    if (response.data.resultCode === 0) {
        let response = await dialogsAPI.getDialogWithUser(userId);
        let messages = response.data.items;
        dispatch(setMessages(messages));
        dispatch(reset('message'))
    }
};

export const requestNewMessagesCount = () => async (dispatch) => {

    const response = await dialogsAPI.getNewMessagesCount();
    let messagesCount = response.data;
    dispatch(setNewMessagesCount(messagesCount));
};

export default dialogsReducer;