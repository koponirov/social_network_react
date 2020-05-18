import {authAPI, profileAPI, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'socialNetwork/auth/SET_USER_DATA';
const SET_AUTH_PROFILE = 'socialNetwork/auth/SET_AUTH_PROFILE';
const SET_CAPTCHA = 'socialNetwork/auth/SET_CAPTCHA';

let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    photo: null,
    captcha: null,
    authProfile:null,
};

const authReducer = (state = initialState, action) => {

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
                authProfile: action.data,
                isAuth: true
            }
        default:
            return state;
    }
};

export const setAuthUserData = (email, id, login, isAuth) => ({
    type: SET_USER_DATA,
    payload: {email, id, login, isAuth}
});

export const setCaptcha = (captcha) => ({
    type: SET_CAPTCHA,
    payload: {captcha}
});

export const setAuthProfile = (data) => ({type: SET_AUTH_PROFILE, data});

export const getAuthUserData = () => async (dispatch) => {
    let response = await authAPI.me();

    if (response.resultCode === 0) {
        let {email, id, login} = response.data;
        dispatch(setAuthUserData(email, id, login));
        profileAPI.getUserProfile(id)
            .then(data => {
                dispatch(setAuthProfile(data))
            })
    }
};

export const refreshProfileData = (id) => (dispatch) => {
    profileAPI.getUserProfile(id)
        .then(data => {
            dispatch(setAuthProfile(data))
        })
};

export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
    let response = await authAPI.login(email, password, rememberMe,captcha);

    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData())
    } else {
        if (response.data.resultCode === 10) {
            debugger
            dispatch(getCaptcha())
        }

        let errorMessage = response.data.messages.length > 0 ? response.data.messages[0] : 'Oops'
        dispatch(stopSubmit('login', {_error: errorMessage}))
    }
};

export const getCaptcha = () => async (dispatch) => {
    debugger;
    let response = await securityAPI.getCapthaUrl();
    const captcha = (response.data.url)
    dispatch(setCaptcha(captcha))
};


export const logout = () => async (dispatch) => {
    let response = await authAPI.logout();

    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
};

export default authReducer;