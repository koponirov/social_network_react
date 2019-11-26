import React from 'react';

import {onMessageChangeActionCreator, sendMessageActionCreator} from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";
import StoreContext from "../../StoreContext";

const DialogsContainer = () => {


    return (

        <StoreContext.Consumer>
            { (store)=> {

                let state = store.getState();

                let sendMessage = () => {

                    store.dispatch(sendMessageActionCreator());
                }

                let changeMessageText = (text) => {

                    let action = onMessageChangeActionCreator(text);
                    store.dispatch(action);

                }

            return   <Dialogs
                dialogs={state.dialogsPage.dialogs}
                messages={state.dialogsPage.messages}
                newMessageText={state.dialogsPage.newMessageText}
                changeMessageText={changeMessageText}
                sendMessage={sendMessage}/>
            }
            }


        </StoreContext.Consumer>
    )
}

export default DialogsContainer;