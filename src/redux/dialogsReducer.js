const SEND_MESSAGE = 'SEND_MESSAGE';
const CREATE_DIALOG = 'CREATE_DIALOG';

let initialState = {
    dialogs: [
        {userId: 1, userName: 'Sasha'},
        {userId: 2, userName: 'Olga'},
        {userId: 3, userName: 'Nelli'},
        {userId: 4, userName: 'Igor'},
        {userId: 5, userName: 'Sergey'},
    ],
    messages: [
        {Id: 1, messageText: 'Hi!'},
        {Id: 2, messageText: 'How are u?'},
        {Id: 3, messageText: "I'm OK"},
        {Id: 4, messageText: 'What u want to do tomorrow?'},
        {Id: 5, messageText: 'Goodbye!'},
    ]
};

const dialogsReducer = (state = initialState, action) => {

    switch (action.type) {

        case SEND_MESSAGE :
            return {
                ...state,
                messages: [...state.messages, {id: 6, messageText: action.message}]
            };
        case CREATE_DIALOG :
            if (state.dialogs.length) {
                return {
                    ...state,
                    dialogs: [...state.dialogs, ...action.user]
                };
            }
            else {
                return {
                    ...state,
                    dialogs: [...action.user]
                };
            }
        default:
            return state;
    }
};

export const sendMessage = (message) => ({type: SEND_MESSAGE, message});
export const createDialog = (user) => ({type: CREATE_DIALOG, user});


export default dialogsReducer;