import { AppStateType } from './reduxStore'

export const getMessages = (state: AppStateType) => state.dialogsPage.messages;

export const getCurrentUserID = (state: AppStateType) => state.dialogsPage.currentUser;

export const getCurrentUserData = (state: AppStateType) => state.dialogsPage.dialogs.filter(d => d.id === getCurrentUserID(state));

export const getIsLoading = (state: AppStateType) => state.dialogsPage.isLoading;

export const getAuthId = (state: AppStateType) => state.auth.id;




