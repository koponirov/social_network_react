export type ContactsType = {
    github: String
    vk: String
    facebook: String
    instagram: String
    twitter: String
    website: String
    youtube: String
    mainLink: String
}

type PhotosType = {
    small: String | null
    large: String | null
}

export type ProfileType = {
    userId: Number
    lookingForAJob: Boolean
    lookingForAJobDescription: String
    fullName: String
    contacts: ContactsType
    photos: PhotosType
}