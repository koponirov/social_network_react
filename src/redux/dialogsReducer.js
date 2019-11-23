const SEND_MESSAGE = 'SEND_MESSAGE';

const WRITE_MESSAGE = 'WRITE_MESSAGE';

const dialogsReducer = (state, action) => {

    switch (action.type) {
        case SEND_MESSAGE :
            let newMessage = {
                messageText: state.newMessageText
            };

            state.messages.push(newMessage);
            state.newMessageText = '';

            return state;

        case WRITE_MESSAGE:
            state.newMessageText = action.newText;

            return state;

        default:

            return state;
    }

};


export const sendMessageActionCreator=()=>{

    return (
        {type:SEND_MESSAGE}
    )
};

export const onMessageChangeActionCreator=(text)=>{

    return (
        {type:WRITE_MESSAGE,newText: text}
    )
}


export default dialogsReducer;