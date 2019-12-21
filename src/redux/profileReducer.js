import {profileAPI} from "../api/api";

const ADD_POST = 'ADD_POST';
const UPDATE_TEXT = 'UPDATE_TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const LOOKING_FOR_JOB = 'LOOKING_FOR_JOB';


let initialState = {
    posts: [
        {userId: 1, messageText: 'How r u?', likeCounter: 1},
        {userId: 2, messageText: 'Huston, we have a problem...', likeCounter: 25},
        {userId: 3, messageText: 'Hi!', likeCounter: 0},
        {userId: 4, messageText: 'What?', likeCounter: 5},
        {userId: 5, messageText: 'dsgdgsde!', likeCounter: 0},
    ],
    newTextInPost: 'I\'m a new text!',
    profile:null,
    lookingForAJob:false
};

const profileReducer = (state=initialState, action) => {

    switch (action.type) {

        case UPDATE_TEXT:
            return {
                ...state,
                newTextInPost: action.newText
            }
        case ADD_POST:
            let newPostText = state.newTextInPost;
            return{
                ...state,
                //newTextInPost: '',
                posts:[...state.posts,{userId: 6,messageText:newPostText,likeCounter: 0}]
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
        default:
            return state;
    }
};

export const addPost = () =>  ({type: ADD_POST});
export const changeText = (text) => ({type: UPDATE_TEXT, newText: text});
export const setUserProfile = (profile) =>  ({type: SET_USER_PROFILE,profile});
export const isLookingForAJob = (isLookingForAJob) =>  ({type: LOOKING_FOR_JOB,isLookingForAJob});

export const getUserProfile=(id)=>{
    return (dispatch)=>{
        profileAPI.getUserProfile(id)
            .then(data=>{
                dispatch(setUserProfile(data));
                dispatch(isLookingForAJob(data.lookingForAJob))
            })

    }
}

export default profileReducer;