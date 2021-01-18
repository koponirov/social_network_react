export const getMessages = state => state.dialogsPage.messages;

export const getCurrentUserID = state => state.dialogsPage.currentUser;

export const getCurrentUserData = state => state.dialogsPage.dialogs.filter(d => d.id === getCurrentUserID(state));

export const getIsLoading = state => state.dialogsPage.isLoading;

export const getAuthId = state => state.auth.id;




