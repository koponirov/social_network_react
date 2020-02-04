export const getUsers = (state) => {
    return state.usersPage.users
};

export const getPageUsersAmount = (state) => {
    return state.usersPage.pageUsersAmount
};

export const getTotalUsersAmount = (state) => {
    return state.usersPage.totalUsersAmount
};

export const getCurrentPage = (state) => {
    return state.usersPage.currentPage
};

export const getIsLoading = (state) => {
    return state.usersPage.isLoading
};

export const getFollowingInProgress = (state) => {
    return state.usersPage.followingInProgress
};

