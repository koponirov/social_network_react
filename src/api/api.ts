import axios from "axios";
import {DialogType, MessageType, PhotosType, ProfileType, User} from "../types";

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {"API-KEY": "62c0f9fc-364d-4b36-8ecb-f700739d05f7"},
//ya:374b61b3-3684-46aa-832c-9d3f951a688f,klubn:9a26a650-26b0-4c4b-8aab-54c45ef378c9,gm:
})

export enum ResultCodesEnum {
    success = 0,
    error = 1
}
export enum ResultCodeForCaptchaEnum {
    captchaIsRequired = 10
}

type MeResponseType = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: ResultCodesEnum
    messages: Array<string>
}
type LoginResponseType = {
    data: {
        userId: number
    }
    resultCode: ResultCodesEnum | ResultCodeForCaptchaEnum
    messages: Array<string>
}
type LogoutResponseType = {
    resultCode: ResultCodesEnum
}

type SavePhotoResponseType = {
    data: PhotosType
    resultCode: ResultCodesEnum
    messages: Array<string>
}

type GetUsersResponseType = {
    items: Array<User>
    totalCount: number
    error: string
}
type GetCaptchaResponseType = {
    url: string
}

type BaseResponseType = {
    data: {}
    resultCode: ResultCodesEnum
    messages: Array<string>
}

type StartChattingResponseType = {
    data: {}
    resultCode: ResultCodesEnum
    messages: Array<string>
    fieldErrors: []
}
type GetMessagesResponseType = {
    error: null | string
    items: []
    totalCount: number
}

type SendMessageResponseType = {
    data: {
        message: MessageType
    }
    resultCode: ResultCodesEnum
    messages: Array<string>
    fieldErrors: []
}


export const authAPI = {
    me() {
        return instance.get<MeResponseType>('auth/me').then(res => res.data)
    },
    login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<LoginResponseType>('auth/login', {email, password, rememberMe, captcha})
            .then(res => res.data)
    },
    logout() {
        return instance.delete<LogoutResponseType>('auth/login').then(res => res.data)
    }
};
export const profileAPI = {
    getUserProfile(id: number) {
        return instance.get<ProfileType>(`profile/${id}`)
            .then(res => res.data)
    },
    getUserStatus(userId: number) {
        return instance.get<string>(`profile/status/${userId}`)
            .then(res => res.data)
    },
    updateUserStatus(status: string) {
        return instance.put<BaseResponseType>(`profile/status`, {status: status})
            .then(res => res.data)
    },
    savePhoto(file: any) {
        const formData = new FormData();
        formData.append("image", file);
        return instance.put<SavePhotoResponseType>(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => res.data)
    },
    saveProfileData(formData: ProfileType) {
        return instance.put<BaseResponseType>(`profile`, formData)
            .then(res => res.data)
    }
};
export const usersAPI = {
    getUsers(currentPage: number, pageUsersAmount: number) {
        return instance.get<GetUsersResponseType>(`users?page=${currentPage}&count=${pageUsersAmount}`)
            .then(res => res.data)
    }
};

export const followAPI = {
    followToUser(userId: number) {
        return instance.delete<BaseResponseType>(`follow/${userId}`)
            .then(res => res.data)
    },
    unfollowToUser(userId: number) {
        return instance.post<BaseResponseType>(`follow/${userId}`)
            .then(res => res.data)
    }
};
export const securityAPI = {
    getCapthaUrl() {
        return instance.get<GetCaptchaResponseType>('security/get-captcha-url')
            .then(res => res.data)
    }
};

export const dialogsAPI = {
    //get all dialogs
    getDialogs() {
        return instance.get<Array<DialogType>>('dialogs')
            .then(res => res.data)
    },
    //start chatting
    startChatting(userId: number) {
        return instance.put<StartChattingResponseType>(`dialogs/${userId}`)
            .then(res => res.data)
    },
    //get list of messages with user
    getDialogWithUser(userId: number) {
        return instance.get<GetMessagesResponseType>(`dialogs/${userId}/messages`)
            .then(res => res.data)
    },
    //send message to user
    sendMessage(userId: number, message: string) {
        return instance.post<SendMessageResponseType>(`dialogs/${userId}/messages`, {body: message})
    },
    //count new messages
    getNewMessagesCount() {
        return instance.get<number>('dialogs/messages/new/count')
    }
};

