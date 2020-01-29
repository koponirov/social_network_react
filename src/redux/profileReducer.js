import {profileAPI} from "../api/api";

const ADD_POST = 'ADD_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const LOOKING_FOR_JOB = 'LOOKING_FOR_JOB';
const SET_STATUS = 'SET_STATUS';

let initialState = {
    posts: [
        {userId: 1, postText: 'How r u?', likeCounter: 1},
        {userId: 2, postText: 'Hi!', likeCounter: 0},
        {userId: 3, postText: 'What?', likeCounter: 5},

    ],
    profile: null,
    lookingForAJob: false,
    status: ''
};

const profileReducer = (state = initialState, action) => {

    switch (action.type) {

        case ADD_POST:
            return {
                ...state,
                posts: [...state.posts, {userId: 6, postText: action.newPost, likeCounter: 0}]
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

        default:
            return state;
    }
};

export const addPost = (newPost) => ({type: ADD_POST, newPost});
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile});
export const isLookingForAJob = (isLookingForAJob) => ({type: LOOKING_FOR_JOB, isLookingForAJob});
export const setStatus = (status) => ({type: SET_STATUS, status});

export const getUserProfile = (id) => {

    return (dispatch) => {
        profileAPI.getUserProfile(id)
            .then(data => {
                dispatch(setUserProfile(data));
                dispatch(isLookingForAJob(data.lookingForAJob))
            })
    }
}

export const getUserStatus = (userId) => {
    return (dispatch) => {
        profileAPI.getUserStatus(userId)
            .then(data => {
                dispatch(setStatus(data));
            })
    }
}

export const updateUserStatus = (status) => {
    return (dispatch) => {
        profileAPI.updateUserStatus(status)
            .then(response => {
                if (response.data.resultCode===0 )
                {dispatch(setStatus(status))};
            })
    }
}

export default profileReducer;