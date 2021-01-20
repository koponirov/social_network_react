import {authAPI, profileAPI, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {ProfileType} from "../types";


const SET_USER_DATA = 'socialNetwork/auth/SET_USER_DATA';
const SET_AUTH_PROFILE = 'socialNetwork/auth/SET_AUTH_PROFILE';
const SET_CAPTCHA = 'socialNetwork/auth/SET_CAPTCHA';


let initialState = {
    id: null as null|number,
    email: null as null|string,
    login: null as null|string,
    isAuth: false,
    captcha: null as null|string,
    authProfile:null
};

export type InitialStateType = typeof initialState;

const authReducer = (state = initialState, action: any) : InitialStateType => {

    switch (action.type) {

        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload
            }
        case SET_CAPTCHA:
            return {
                ...state,
                ...action.payload
            }
        case SET_AUTH_PROFILE:
            return {
                ...state,
                authProfile: action.payload,
                isAuth: true
            }
        default:
            return state;
    }
};

type setAuthUserDataActionPayloadCreatorType = {
    email: string | null
    id: number | null
    login: string | null
    isAuth: boolean
}

type setAuthUserDataActionCreatorType = {
    type: typeof SET_USER_DATA,
    payload: setAuthUserDataActionPayloadCreatorType
}

export const setAuthUserData = (email: string | null , id: number | null, login: string | null, isAuth: boolean): setAuthUserDataActionCreatorType => ({
    type: SET_USER_DATA,
    payload: {email, id, login, isAuth}
});

type setCaptchaType = {
    type: typeof SET_CAPTCHA,
    payload: {captcha: string}
}

export const setCaptcha = (captcha: string) : setCaptchaType => ({
    type: SET_CAPTCHA,
    payload: {captcha}
});



type setAuthProfileActionType = {
    type: typeof SET_AUTH_PROFILE
    payload: ProfileType
}

export const setAuthProfile = (data: ProfileType) : setAuthProfileActionType => ({type: SET_AUTH_PROFILE, payload: data});

export const getAuthUserData = () => async (dispatch: any) => {
    let response = await authAPI.me();

    if (response.resultCode === 0) {
        let {email, id, login} = response.data;
        dispatch(setAuthUserData(email, id, login, true));
        profileAPI.getUserProfile(id)
            .then((data: any )=> {
                dispatch(setAuthProfile(data))
            })
    }
};

export const refreshProfileData = (id: number) => (dispatch: any) => {
    profileAPI.getUserProfile(id)
        .then((data: ProfileType ) => {
            dispatch(setAuthProfile(data))
        })
};

export const login = (email: string, password: string, rememberMe: boolean, captcha: string) => async (dispatch: any) => {
    let response = await authAPI.login(email, password, rememberMe,captcha);

    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData())
    } else {
        if (response.data.resultCode === 10) {
            dispatch(getCaptcha())
        }

        let errorMessage = response.data.messages.length > 0 ? response.data.messages[0] : 'Oops'
        dispatch(stopSubmit('login', {_error: errorMessage}))
    }
};

export const getCaptcha = () => async (dispatch: any) => {

    let response = await securityAPI.getCapthaUrl();
    const captcha = (response.data.url)
    dispatch(setCaptcha(captcha))
};


export const logout = () => async (dispatch: any) => {
    let response = await authAPI.logout();

    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
};

export default authReducer;