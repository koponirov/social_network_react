import { authAPI, profileAPI, ResultCodeForCaptchaEnum, ResultCodesEnum, securityAPI } from "../api/api";
import { stopSubmit } from "redux-form";
import { ProfileType } from "../types";
import { AppStateType, InferActionsTypes } from "./reduxStore";
import { ThunkAction } from "redux-thunk";

// type InitialStateType = {
//     id: number,
//     email:  null|string,
//     login: null|string,
//     isAuth: boolean,
//     captcha: null|string,
//     authProfile: null|ProfileType,
//     photo: string|null
// }

let initialState = {
    id: 0 as number|null,
    login: null as null|string,
    isAuth: false,
    captcha: null as null|string,
    authProfile:null as null|ProfileType,
    photo: null as string|null
};

export type InitialStateType = typeof initialState;

const authReducer = (state = initialState, action: ActionsTypes) : InitialStateType => {

    switch (action.type) {

        case 'SET_USER_DATA':
            return {
                ...state,
                ...action.payload
            }
        case 'SET_CAPTCHA':
            return {
                ...state,
                ...action.payload
            }
        case 'SET_AUTH_PROFILE':
            return {
                ...state,
                authProfile: action.payload,
                isAuth: true
            }
        default:
            return state;
    }
};

export const authActions = {
    setAuthUserData: (email: string|null  , id: number|null , login: string|null , isAuth: boolean) => ({
        type: 'SET_USER_DATA',
        payload: {email, id, login, isAuth}
    } as const),
    setCaptcha: (captcha: string) => ({type: 'SET_CAPTCHA', payload: {captcha}} as const),
    setAuthProfile: (data: ProfileType) => ({type: 'SET_AUTH_PROFILE', payload: data} as const),
}

type ActionsTypes = InferActionsTypes<typeof authActions>

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>


export const getAuthUserData = (): ThunkType => async (dispatch) => {
    let data = await authAPI.me();

    if (data.resultCode === ResultCodesEnum.success) {
        let {email, id, login} = data.data;
        dispatch(authActions.setAuthUserData(email, id, login, true));
        profileAPI.getUserProfile(id)
            .then((data: ProfileType )=> {
                dispatch(authActions.setAuthProfile(data))
            })
    }
};

export const refreshProfileData = (id: number): ThunkType => async (dispatch) => {
    profileAPI.getUserProfile(id)
        .then(( data: ProfileType) => {
            dispatch(authActions.setAuthProfile(data))
        })
};

export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => async (dispatch) => {
    let data = await authAPI.login(email, password, rememberMe,captcha);

    if (data.resultCode === ResultCodesEnum.success) {
        await dispatch(getAuthUserData())
    } else {
        if (data.resultCode === ResultCodeForCaptchaEnum.captchaIsRequired) {
            await dispatch(getCaptcha())
        }

        let errorMessage = data.messages.length > 0 ? data.messages[0] : 'Oops'
        // @ts-ignore
        dispatch(stopSubmit('login', {_error: errorMessage}))
    }
};

export const getCaptcha = (): ThunkType => async (dispatch) => {

    let data = await securityAPI.getCapthaUrl();
    const captcha = data.url
    dispatch(authActions.setCaptcha(captcha))
};

export const logout = (): ThunkType => async (dispatch) => {
    let data = await authAPI.logout();

    if (data.resultCode === ResultCodesEnum.success) {
        dispatch(authActions.setAuthUserData(null, null, null, false))
    }
};

export default authReducer;
