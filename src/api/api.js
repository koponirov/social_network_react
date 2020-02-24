import * as axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {"API-KEY": "ed6168aa-083c-4712-91d3-afe70566eba2"},

})

export const usersAPI = {
    getUsers(currentPage, pageUsersAmount) {
        return instance.get(`users?page=${currentPage}&count=${pageUsersAmount}`)

    }
}

export const authAPI = {

    me() {
        return instance.get('auth/me')
            .then(response => {
                return response.data
            })
    },

    login (email,password,rememberMe = false,captcha = null) {
        return instance.post('auth/login',{email,password,rememberMe,captcha})
    },

    logout () {
        return instance.delete('auth/login')
    }
}

export const profileAPI = {

    getUserProfile(id) {
        return instance.get(`profile/${id}`)
            .then(response => {
                return response.data
            })
    },

    getUserStatus(userId) {
        return instance.get(`profile/status/${userId}`)
            .then(response => {
                return response.data
            })
    },

    updateUserStatus(status) {
        return instance.put(`profile/status`, {status: status})

    },

    savePhoto(file) {
        const formData = new FormData();
        formData.append("image", file);
        return instance.put(`profile/photo`, formData,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },

    saveProfileData(formData) {
        return instance.put(`profile`, formData)

    }
}

export const followAPI = {
    followToUser(userId) {
        return instance.delete(`follow/${userId}`)
    },
    unfollowToUser(userId) {
        return instance.post(`follow/${userId}`)
    }
}

export const securityAPI = {
    getCapthaUrl() {
        return instance.get('security/get-captcha-url')
    }
}

