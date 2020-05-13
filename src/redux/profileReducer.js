import {profileAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const ADD_POST = 'socialNetwork/profile/ADD_POST';
const DELETE_POST = 'socialNetwork/profile/DELETE_POST';
const SET_USER_PROFILE = 'socialNetwork/profile/SET_USER_PROFILE';
const LOOKING_FOR_JOB = 'socialNetwork/profile/LOOKING_FOR_JOB';
const SET_STATUS = 'socialNetwork/profile/SET_STATUS';
const SAVE_PHOTO_SUCCES = 'socialNetwork/profile/SAVE_PHOTO_SUCCES';

let initialState = {
    posts: [
        {userId: 1, postText: 'How r u?', likeCounter: 1},
        {userId: 2, postText: 'Hi!', likeCounter: 0},
        {userId: 3, postText: 'What?', likeCounter: 5},
    ],
    profile: null,
    lookingForAJob: false,
    status: '',
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                posts: [...state.posts, {userId: 6, postText: action.newPost, likeCounter: 0}]
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post.userId != action.id)
            }
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        case LOOKING_FOR_JOB:
            return {
                ...state,
                lookingForAJob: action.isLookingForAJob
            }
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            }
        case SAVE_PHOTO_SUCCES:
            return {
                ...state,
                profile: {...state.profile, photos: action.file}
            }
        default:
            return state;
    }
};

export const addPost = (newPost) => ({type: ADD_POST, newPost});
export const deletePost = (id) => ({type: DELETE_POST, id});
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile});

export const setStatus = (status) => ({type: SET_STATUS, status});
export const savePhotoSuccess = (file) => ({type: SAVE_PHOTO_SUCCES, file});


export const getUserProfile = (id) => async (dispatch) => {
    const data = await profileAPI.getUserProfile(id);
    dispatch(setUserProfile(data));

}

export const getUserStatus = (userId) => async (dispatch) => {
    const data = await profileAPI.getUserStatus(userId);
    dispatch(setStatus(data));
}

export const updateUserStatus = (status) => async (dispatch) => {
    try {
        const response = await profileAPI.updateUserStatus(status);
        if (response.data.resultCode === 0) {
            dispatch(setStatus(status))
        }
    }
    catch (error) {

        alert('error')
        console.error(error)
        console.log(error)
    }

}

export const savePhoto = (file) => async (dispatch) => {
    const response = await profileAPI.savePhoto(file);
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos))
    }
}

export const saveProfileData = (formData) => async (dispatch,getState) => {
    let response = await profileAPI.saveProfileData(formData);
    if (response.data.resultCode === 0) {

        const userId=getState().auth.id;
        const data = await profileAPI.getUserProfile(userId);
        dispatch(setUserProfile(data));
    }
    else {
        let errorMessage = response.data.messages.length > 0 ? response.data.messages[0] : 'Oops';
        console.log(errorMessage)
        dispatch(stopSubmit('profileData', {_error: errorMessage}));
        return Promise.reject(errorMessage)
    }
}

export default profileReducer;