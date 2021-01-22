import {profileAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {ProfileType} from "../types";

const ADD_POST = 'socialNetwork/profile/ADD_POST';
const DELETE_POST = 'socialNetwork/profile/DELETE_POST';
const SET_USER_PROFILE = 'socialNetwork/profile/SET_USER_PROFILE';
const LOOKING_FOR_JOB = 'socialNetwork/profile/LOOKING_FOR_JOB';
const SET_STATUS = 'socialNetwork/profile/SET_STATUS';
const SAVE_PHOTO_SUCCESS = 'socialNetwork/profile/SAVE_PHOTO_SUCCES';


export type PostType = {
    userId: number,
    postText: string,
    likeCounter: number
}



export type InitialStateType = typeof initialState

let initialState = {
    posts: [
        {userId: 1, postText: 'How r u?', likeCounter: 1},
        {userId: 2, postText: 'Hi!', likeCounter: 0},
        {userId: 3, postText: 'What?', likeCounter: 5},
    ] as Array<PostType>,
    profile:null as null | ProfileType,
    lookingForAJob: false,
    status: '',
};



const profileReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                posts: [...state.posts, {userId: 6, postText: action.newPost, likeCounter: 0}]
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post.userId !== action.id)
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
        case SAVE_PHOTO_SUCCESS:
            return {
                ...state,
                profile: {...state.profile, photos: action.file} as ProfileType
            }
        default:
            return state;
    }
};
type AddPostType = {
    type: typeof ADD_POST
    newPost: PostType
}
export const addPost = (newPost: PostType): AddPostType => ({type: ADD_POST, newPost});

type DeletePostType = {
    type: typeof DELETE_POST
    id: Number
}
export const deletePost = (id: Number): DeletePostType => ({type: DELETE_POST, id});

type SetUserProfileType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}
export const setUserProfile = (profile: ProfileType): SetUserProfileType => ({type: SET_USER_PROFILE, profile});

type SetStatusType = {
    type: typeof SET_STATUS
    status: String
}
export const setStatus = (status: string): SetStatusType => ({type: SET_STATUS, status});

type SavePhotoSuccessType = {
    type: typeof SAVE_PHOTO_SUCCESS
    file: String
}
export const savePhotoSuccess = (file: string): SavePhotoSuccessType => ({type: SAVE_PHOTO_SUCCESS, file});


export const getUserProfile = (id: number) => async (dispatch: any) => {
    const data = await profileAPI.getUserProfile(id);
    dispatch(setUserProfile(data));

};

export const getUserStatus = (userId: Number) => async (dispatch: any) => {
    const data = await profileAPI.getUserStatus(userId);
    dispatch(setStatus(data));
};

export const updateUserStatus = (status: string) => async (dispatch: any) => {
    try {
        const response = await profileAPI.updateUserStatus(status);
        if (response.data.resultCode === 0) {
            dispatch(setStatus(status))
        }
    }
    catch (error) {
        alert('error updateUserStatus')
        console.error(error)
        console.log(error)
    }
}

export const savePhoto = (file: string) => async (dispatch: any) => {
    const response = await profileAPI.savePhoto(file);
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos))
    }
};

export const saveProfileData = (formData: ProfileType ) => async (dispatch: any,getState: any) => {
    let response = await profileAPI.saveProfileData(formData);

    if (response.data.resultCode === 0) {
        const userId = getState().auth.id;
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