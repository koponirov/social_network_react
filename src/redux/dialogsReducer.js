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
        {messageText: 'Hi!'},
        {messageText: 'How are u?'},
        {messageText: "I'm OK"},
        {messageText: 'What u want to do tomorrow?'},
        {messageText: 'Goodbye!'},
    ],
    newMessageText: '...'
};

const dialogsReducer = (state = initialState, action) => {

    let stateCopy={
        ...state
    };

    switch (action.type) {
        case SEND_MESSAGE :
            let newMessage = {
                messageText: state.newMessageText
            };
            
            stateCopy.messages=[...state.messages];
            stateCopy.messages.push(newMessage);
            stateCopy.newMessageText = '';

            return stateCopy;

        case WRITE_MESSAGE:

            stateCopy.newMessageText = action.newText;

            return stateCopy;



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