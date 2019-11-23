const ADD_POST = 'ADD_POST';

const UPDATE_TEXT = 'UPDATE_TEXT';

const profileReducer=(state,action) => {

    switch (action.type) {

        case UPDATE_TEXT:
            state.newTextInPost = action.newText;

            return state;

        case ADD_POST:
            let newPost = {
                userId: 6,
                messageText: state.newTextInPost,
                likeCounter: 0
            };
            state.posts.push(newPost);
            state.newTextInPost = '';

            return state;

        default:

            return state;
    }
};

export const addPostActiveCreator=()=>({type:ADD_POST});

export const changeTextValueActiveCreator=(text)=>{

    return (
        {type:UPDATE_TEXT,newText:text}
    )
};

export default profileReducer;