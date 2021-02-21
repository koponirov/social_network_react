import {dialogsAPI, ResultCodesEnum} from "../api/api";
import {reset} from 'redux-form';
import {DialogType, MessageType} from "../types";
import {AppStateType, InferActionsTypes} from "./reduxStore";
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";


export type MessagesType = {
    items: Array<MessageType> | []
    totalCount: number
    error: null | number
}

let initialState = {
    dialogs: [] as Array<DialogType>,
    messages: [] as Array<MessageType>,
    newMessagesCount: 0,
    currentUser: null as null | number,
    isLoading: false
};

export type InitialStateType = typeof initialState

const dialogsReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

    switch (action.type) {

        case 'SET_DIALOGS' :
            return {
                ...state,
                dialogs: [...action.dialogs]
            };
        case 'SET_MESSAGES' :
            return {
                ...state,
                messages: [...action.messages]
            };
        case 'TOGGLE_IS_LOADING':
            return {
                ...state,
                isLoading: action.isLoading
            }
        case 'SET_NEWMESSAGES_COUNT' :
            return {
                ...state,
                newMessagesCount: action.number
            };
        case 'SET_CURRENT_USER' :
            return {
                ...state,
                currentUser: action.userId
            };
        case 'SEND_MESSAGE' :
            return {
                ...state,
                messages: [...state.messages, action.message]
            };
        // case 'CREATE_DIALOG' :
        //     if (state.dialogs.length) {
        //         return {
        //             ...state,
        //             dialogs: [...state.dialogs, ...action.userId]
        //         };
        //     } else {
        //         return {
        //             ...state,
        //             dialogs: [...action.userId]
        //         };
        //     }
        default:
            return state;
    }
};


export const dialogsActions = {
    setDialogs: (dialogs: Array<DialogType>) => ({type: 'SET_DIALOGS', dialogs} as const),
    setMessages: (messages: Array<MessageType>) => ({type: 'SET_MESSAGES', messages} as const),
    setNewMessagesCount: (number: number) => ({type: 'SET_NEWMESSAGES_COUNT', number} as const),
    setCurrentUser: (userId: number) => ({type: 'SET_CURRENT_USER', userId} as const),
    sendMessage: (message: MessageType) => ({type: 'SEND_MESSAGE', message} as const),
    createDialog: (userId: number) => ({type: 'CREATE_DIALOG', userId} as const),
    setIsLoading: (isLoading: boolean) => ({type: 'TOGGLE_IS_LOADING', isLoading} as const),

}

type ActionsTypes = InferActionsTypes<typeof dialogsActions>

type DispatchType = Dispatch<ActionsTypes>
export type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>


export const requestDialogs = (): ThunkType => async (dispatch, getState) => {
    let data = await dialogsAPI.getDialogs();
    dispatch(dialogsActions.setDialogs(data));
};

export const startChatting = (userId: number): ThunkType => async (dispatch, getState) => {
    let response = await dialogsAPI.startChatting(userId)
};

export const requestMessages = (userId: number): ThunkType => async (dispatch, getState) => {
    debugger
    dispatch(dialogsActions.setIsLoading(true));
    dispatch(dialogsActions.setCurrentUser(userId));
    let data = await dialogsAPI.getDialogWithUser(userId);
    let messages = data.items;
    dispatch(dialogsActions.setMessages(messages));
    dispatch(dialogsActions.setIsLoading(false))
};

export const sendNewMessage = (userId: number, message: string): ThunkType => async (dispatch,getState) => {

    const response = await dialogsAPI.sendMessage(userId, message);
    if (response.data.resultCode === ResultCodesEnum.success) {
        let data = await dialogsAPI.getDialogWithUser(userId);
        let messages = data.items;
        dispatch(dialogsActions.setMessages(messages));
        // @ts-ignore
        dispatch(reset('message'))
    }
};

export const requestNewMessagesCount = (): ThunkType => async (dispatch,getState) => {

    const response = await dialogsAPI.getNewMessagesCount();
    let messagesCount = response.data;
    dispatch(dialogsActions.setNewMessagesCount(messagesCount));
};

export default dialogsReducer;
