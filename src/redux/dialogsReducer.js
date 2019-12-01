const SEND_MESSAGE = 'SEND_MESSAGE';

const WRITE_MESSAGE = 'WRITE_MESSAGE';

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
    ],
    newMessageText: '...'
};

const dialogsReducer = (state = initialState, action) => {



    switch (action.type) {
        case SEND_MESSAGE :

            let newMessage = state.newMessageText//how???we need to copy state,not allow to change current state!
            return {
                ...state,
                newMessageText: '',
                messages: [...state.messages, {id: 6, messageText: newMessage}]
            }


        case WRITE_MESSAGE:
            return {
                ...state,
                newMessageText: action.newText
            }

        default:

            return state;
    }

};


export const sendMessageActionCreator = () => {

    return (
        {type: SEND_MESSAGE}
    )
};

export const onMessageChangeActionCreator = (text) => {

    return (
        {type: WRITE_MESSAGE, newText: text}
    )
}


export default dialogsReducer;