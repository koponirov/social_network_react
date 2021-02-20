import {authAPI, profileAPI, ResultCodeForCaptchaEnum, ResultCodesEnum, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {ProfileType} from "../types";


const SET_USER_DATA = 'socialNetwork/auth/SET_USER_DATA';
const SET_AUTH_PROFILE = 'socialNetwork/auth/SET_AUTH_PROFILE';
const SET_CAPTCHA = 'socialNetwork/auth/SET_CAPTCHA';


// export type InitialStateType = {
//     id: number| null
//     email:  null|string,
//     login:   null|string,
//     isAuth: boolean,
//     captcha: null|string,
//     authProfile:null| ProfileType,
//     photo: string|null
// }

let initialState = {
    id: 0,
    email: null as null|string,
    login: null as null|string,
    isAuth: false,
    captcha: null as null|string,
    authProfile:null,
    photo: null as string|null
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
    id: null | number
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
    let data = await authAPI.me();

    if (data.resultCode === ResultCodesEnum.success) {
        let {email, id, login} = data.data;
        dispatch(setAuthUserData(email, id, login, true));
        profileAPI.getUserProfile(id)
            .then((data: any )=> {
                dispatch(setAuthProfile(data))
            })
    }
};

export const refreshProfileData = (id: number) => (dispatch: any) => {
    profileAPI.getUserProfile(id)
        .then(( data: ProfileType) => {
            dispatch(setAuthProfile(data))
        })
};

export const login = (email: string, password: string, rememberMe: boolean, captcha: string) => async (dispatch: any) => {
    let data = await authAPI.login(email, password, rememberMe,captcha);

    if (data.resultCode === ResultCodesEnum.success) {
        dispatch(getAuthUserData())
    } else {
        if (data.resultCode === ResultCodeForCaptchaEnum.captchaIsRequired) {
            dispatch(getCaptcha())
        }

        let errorMessage = data.messages.length > 0 ? data.messages[0] : 'Oops'
        dispatch(stopSubmit('login', {_error: errorMessage}))
    }
};

export const getCaptcha = () => async (dispatch: any) => {

    let data = await securityAPI.getCapthaUrl();
    const captcha = data.url
    dispatch(setCaptcha(captcha))
};


export const logout = () => async (dispatch: any) => {
    let data = await authAPI.logout();

    if (data.resultCode === ResultCodesEnum.success) {
        dispatch(setAuthUserData(null, null, null, false))
    }
};

export default authReducer;
