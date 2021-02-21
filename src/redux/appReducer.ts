import {getAuthUserData} from "./authReducer";
import {AppStateType, InferActionsTypes} from "./reduxStore";
import {ThunkAction} from "redux-thunk";

const SET_INITIALIZED = 'socialNetwork/app/SET_INITIALIZED';

type InitialStateType = {
    initialized: boolean
}

let initialState : InitialStateType = {
    initialized: false
};

const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

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

// type initializedSuccesActionType = {
//     type: typeof SET_INITIALIZED
// }

const appActions = {
    initialized: () => ({type: SET_INITIALIZED} as const),
}

type ActionsTypes = InferActionsTypes<typeof appActions>
type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsTypes>

export const initializeApp = (): ThunkType => (dispatch) => {
    let promise = dispatch(getAuthUserData());
    Promise.all([promise]).then(() => {
        dispatch(appActions.initialized())
    })
};


export default appReducer;
