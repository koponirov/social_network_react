import {getAuthUserData} from "./authReducer";

const SET_INITIALIZED = 'socialNetwork/app/SET_INITIALIZED';

export type initialStateType = {
    initialized: boolean
}

let initialState : initialStateType = {
    initialized: false
};

const appReducer = (state = initialState, action:any) : initialStateType => {

    switch (action.type) {
        case SET_INITIALIZED:
            return {
                ...state,
                initialized: true
            };

        default:
            return state;
    }
};

type initializedSuccesActionType = {
    type: typeof SET_INITIALIZED
}

export const initialized = () : initializedSuccesActionType => ({type: SET_INITIALIZED});

export const initializeApp = () => (dispatch:any) => {
    let promise = dispatch(getAuthUserData());
    Promise.all([promise]).then(() => {
        dispatch(initialized())
    })
};


export default appReducer;