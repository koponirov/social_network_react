const ADD_POST = 'ADD_POST';
const UPDATE_TEXT = 'UPDATE_TEXT';

let initialState = {
    posts: [
        {userId: 1, messageText: 'How r u?', likeCounter: 1},
        {userId: 2, messageText: 'Huston, we have a problem...', likeCounter: 25},
        {userId: 3, messageText: 'Hi!', likeCounter: 0},
        {userId: 4, messageText: 'What?', likeCounter: 5},
        {userId: 5, messageText: 'dsgdgsde!', likeCounter: 0},
    ],
    newTextInPost: 'I\'m a new text!'

};

const profileReducer = (state=initialState, action) => {

    switch (action.type) {

        case UPDATE_TEXT:{
            return {
                ...state,
                newTextInPost: action.newText
            }
        }

        case ADD_POST: {
            let newPostText = state.newTextInPost;
            debugger;
            return{

                ...state,
                //newTextInPost: '',
                posts:[...state.posts,{userId: 6,messageText:newPostText,likeCounter: 0}]

            }

        }

        default:

            return state;
    }
};

export const addPostActionCreator = () =>  ({type: ADD_POST});

export const changeTextValueActionCreator = (text) => {

    return (
        {type: UPDATE_TEXT, newText: text}
    )
};

export default profileReducer;