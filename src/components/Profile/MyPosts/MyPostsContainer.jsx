import React from 'react';
import {addPostActiveCreator, changeTextValueActiveCreator} from "../../../redux/profileReducer";
import MyPosts from "./MyPosts";
import StoreContext from "../../../StoreContext";


const MyPostsContainer = () => {



    return (

        <StoreContext.Consumer>
            {(store) => {


                let state = store.getState();

                let addPost = () => {

                    store.dispatch(addPostActiveCreator());
                }

                let changeText = (text) => {

                    let action = changeTextValueActiveCreator(text)
                    store.dispatch(action);

                }

                return <MyPosts addPost={addPost}
                                changeText={changeText}
                                newTextInPost={state.profilePage.newTextInPost}
                                posts={state.profilePage.posts}/>
            }
            }


        </StoreContext.Consumer>

    )
}

export default MyPostsContainer;