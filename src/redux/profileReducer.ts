import {profileAPI, ResultCodesEnum} from "../api/api";
import {stopSubmit} from "redux-form";
import {PostType, ProfileType} from "../types";
import {AppStateType, InferActionsTypes} from "./reduxStore";
import {ThunkAction} from "redux-thunk";

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

const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'ADD_POST':
            return {
                ...state,
                //posts: [...state.posts, {userId: 6, postText: action.newPost, likeCounter: 0}]
                posts: [...state.posts, action.newPost]
            }
        case 'DELETE_POST':
            return {
                ...state,
                posts: state.posts.filter(post => post.userId !== action.id)
            }
        case 'SET_USER_PROFILE':
            return {
                ...state,
                profile: action.profile
            }
        // case 'LOOKING_FOR_JOB':
        //     return {
        //         ...state,
        //         lookingForAJob: action.isLookingForAJob
        //     }
        case 'SET_STATUS':
            return {
                ...state,
                status: action.status
            }
        case 'SAVE_PHOTO_SUCCESS':
            return {
                ...state,
                profile: {...state.profile, photos: action.file} as ProfileType
            }
        default:
            return state;
    }
};

export const profileActions = {
    addPost: (newPost: PostType) => ({type: 'ADD_POST', newPost} as const),
    deletePost: (id: Number) => ({type: 'DELETE_POST', id} as const),
    setUserProfile: (profile: ProfileType) => ({type: 'SET_USER_PROFILE', profile} as const),
    setStatus: (status: string) => ({type: 'SET_STATUS', status} as const),
    savePhotoSuccess: (file: any) => ({type: 'SAVE_PHOTO_SUCCESS', file} as const),
}

type ActionsTypes = InferActionsTypes<typeof profileActions>

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>


export const getUserProfile = (id: number): ThunkType => async (dispatch) => {
    const data = await profileAPI.getUserProfile(id);
    dispatch(profileActions.setUserProfile(data));

};

export const getUserStatus = (userId: number): ThunkType => async (dispatch) => {
    const data = await profileAPI.getUserStatus(userId);
    dispatch(profileActions.setStatus(data));
};

export const updateUserStatus = (status: string): ThunkType => async (dispatch) => {
    try {
        const data = await profileAPI.updateUserStatus(status);
        if (data.resultCode === ResultCodesEnum.success) {
            dispatch(profileActions.setStatus(status))
        }
    }
    catch (error) {
        alert('error updateUserStatus')
        console.error(error)
        console.log(error)
    }
}

export const savePhoto = (file: string): ThunkType => async (dispatch) => {
    const data = await profileAPI.savePhoto(file);
    if (data.resultCode === ResultCodesEnum.success) {
        dispatch(profileActions.savePhotoSuccess(data.data))
    }
};

export const saveProfileData = (formData: ProfileType ): ThunkType => async (dispatch,getState) => {
    let data = await profileAPI.saveProfileData(formData);

    if (data.resultCode === 0) {
        const userId = getState().auth.id;
        const data = await profileAPI.getUserProfile(userId as number);
        dispatch(profileActions.setUserProfile(data));
    }
    else {
        let errorMessage = data.messages.length > 0 ? data.messages[0] : 'Oops';
        console.log(errorMessage)

        // @ts-ignore
        dispatch(stopSubmit('profileData', {_error: errorMessage}));
        return Promise.reject(errorMessage)
    }
}

export default profileReducer;
