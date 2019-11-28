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
            let stateCopy={...state};
            stateCopy.newTextInPost = action.newText;

            return stateCopy;
        }


        case ADD_POST: {
            let newPost = {
                userId: 6,
                messageText: state.newTextInPost,
                likeCounter: 0
            };
            let stateCopy={...state};
            stateCopy.posts=[...state.posts];
            stateCopy.posts.push(newPost);
            stateCopy.newTextInPost = '';

            return stateCopy;
        }


        default:

            return state;
    }
};

export const addPostActiveCreator = () => ({type: ADD_POST});

export const changeTextValueActiveCreator = (text) => {

    return (
        {type: UPDATE_TEXT, newText: text}
    )
};

export default profileReducer;