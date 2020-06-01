import {dialogsAPI} from "../api/api";
import {reset} from 'redux-form';

const SET_DIALOGS = 'socialNetwork/dialogs/SET_DIALOGS';
const SET_MESSAGES = 'socialNetwork/dialogs/SET_MESSAGES';
const SET_NEWMESSAGES_COUNT = 'socialNetwork/dialogs/SET_NEWMESSAGES_COUNT';
const SET_CURRENT_USER = 'socialNetwork/dialogs/SET_CURRENT_USER';
const SEND_MESSAGE = 'socialNetwork/dialogs/SEND_MESSAGE';
const CREATE_DIALOG = 'socialNetwork/dialogs/CREATE_DIALOG';
const TOGGLE_IS_LOADING = 'socialNetwork/dialogs/TOGGLE_IS_LOADING';

export type DialogType = {
    id: number
    userName: string
    hasNewMessages: boolean
    lastDialogActivityDate: string
    lastUserActivityDate: string
    newMessagesCount: number
    photos: {
        small: string
        large: string
    }
}

export type MessagesItemsType = {
    id: string
    body: string
    translatedBody: null|string
    addedAt: string
    senderId: number
    senderName: string,
    recipientId: number
    viewed: boolean
}

export type MessagesType = {
    items:  MessagesItemsType
    totalCount: number
    error: null
}

let initialState = {
    dialogs: [] as Array<DialogType>,
    messages: [],
    newMessagesCount:null,
    currentUser: null,
    isLoading:false
};

export type initialStateType = typeof initialState

const dialogsReducer = (state = initialState, action: any) => {

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

type setDialogsActionCreatorType = {
    type: typeof SET_DIALOGS
    dialogs: DialogType
}

type setMessagesActionCreatorType = {
    type: typeof SET_MESSAGES
    messages: MessagesType
}

type setNewMessagesCountActionCreatorType = {
    type: typeof SET_NEWMESSAGES_COUNT
    number: number
}

type setCurrentUserActionCreatorType = {
    type: typeof SET_CURRENT_USER
    userId: number
}

type sendMessageActionCreatorType = {
    type: typeof SEND_MESSAGE
    message: string
}
type createDialogActionCreatorType = {
    type: typeof CREATE_DIALOG
    userId: number
}
type setIsLoadingActionCreatorType = {
    type: typeof TOGGLE_IS_LOADING
    isLoading: boolean
}

export const setDialogs = (dialogs: DialogType): setDialogsActionCreatorType => ({type: SET_DIALOGS, dialogs});
export const setMessages = (messages: MessagesType): setMessagesActionCreatorType=> ({type: SET_MESSAGES, messages});
export const setNewMessagesCount = (number: number): setNewMessagesCountActionCreatorType => ({type: SET_NEWMESSAGES_COUNT, number});
export const setCurrentUser = (userId:number): setCurrentUserActionCreatorType => ({type: SET_CURRENT_USER, userId});
export const sendMessage = (message: string): sendMessageActionCreatorType => ({type: SEND_MESSAGE, message});
export const createDialog = (userId: number): createDialogActionCreatorType => ({type: CREATE_DIALOG, userId});
export const setIsLoading = (isLoading: boolean): setIsLoadingActionCreatorType => ({type: TOGGLE_IS_LOADING, isLoading});

export const requestDialogs = () => async (dispatch: any) => {
    let response = await dialogsAPI.getDialogs();
    dispatch(setDialogs(response.data));
};

export const startChatting = (userId: number) => async (dispatch: any) => {
    let response = await dialogsAPI.startChatting(userId)
};

export const requestMessages = (userId: number) => async (dispatch: any) => {
    dispatch(setIsLoading(true));
    dispatch(setCurrentUser(userId));
    let response = await dialogsAPI.getDialogWithUser(userId);
    let messages = response.data.items;
    dispatch(setMessages(messages));
    dispatch(setIsLoading(false))
};

export const sendNewMessage = (userId: number, message: string) => async (dispatch: any) => {

    const response = await dialogsAPI.sendMessage(userId, message);
    if (response.data.resultCode === 0) {
        let response = await dialogsAPI.getDialogWithUser(userId);
        let messages = response.data.items;
        dispatch(setMessages(messages));
        dispatch(reset('message'))
    }
};

export const requestNewMessagesCount = () => async (dispatch: any) => {

    const response = await dialogsAPI.getNewMessagesCount();
    let messagesCount = response.data;
    dispatch(setNewMessagesCount(messagesCount));
};

export default dialogsReducer;