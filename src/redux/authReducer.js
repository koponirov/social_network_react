import {authAPI, profileAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'SET_USER_DATA';
const SHOW_USER_PHOTO = 'SHOW_USER_PHOTO';


let initialState = {
    id:null,
    email:null,
    login:null,
    isAuth:false,
    photo: null

};

const authReducer = (state=initialState, action) => {

    switch (action.type) {

        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload
            }
        case SHOW_USER_PHOTO:
            return {
                ...state,
                photo:action.smallUserPhoto,
                isAuth: true
            }


        default:
            return state;
    }
};

export const setAuthUserData = (email,id,login,isAuth) =>  ({type: SET_USER_DATA,payload:{email,id,login,isAuth}});
export const showUserPhoto = (smallUserPhoto) =>  ({type: SHOW_USER_PHOTO,smallUserPhoto});

export const getAuthUserData =()=>{
    return (dispatch)=>{
        authAPI.me()
            .then(data=>{
                if (data.resultCode===0){
                    let {email,id,login}=data.data;
                    dispatch(setAuthUserData(email,id,login));
                    profileAPI.getUserProfile(id)
                        .then(data=>{
                            let smallUserPhoto=data.photos.small;
                            dispatch(showUserPhoto(smallUserPhoto))
                        })
                }
            })
    }
}

export const login=(email,password,rememberMe)=>{
    return (dispatch)=>{
        authAPI.login(email,password,rememberMe)
            .then(response=>{
                if (response.data.resultCode===0){
                    dispatch(getAuthUserData())
                }
                else {
                    let errorMessage = response.data.messages.length > 0 ? response.data.messages[0] : 'ebana'
                    dispatch(stopSubmit('login',{_error: errorMessage}))
                }
            })
    }
}

export const logout=()=>{
    return (dispatch)=>{
        authAPI.logout()
            .then(response=>{
                if (response.data.resultCode===0){
                    dispatch(setAuthUserData(null,null,null,false))
                }
            })
    }
}



export default authReducer;