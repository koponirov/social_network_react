export const getMessages = (state) => {

    return state.dialogsPage.messages
};
export const getCurrentUserID = (state) => {
    return state.dialogsPage.currentUser
};
export const getCurrentUserData = (state) => {
    return state.dialogsPage.dialogs.filter(d=>d.id==getCurrentUserID(state))
};
export const getIsLoading = (state) => {
    return state.dialogsPage.isLoading
};
export const getAuthId = (state) => {
    return state.auth.id
};




