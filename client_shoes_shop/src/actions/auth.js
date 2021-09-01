import {
    SIGN_IN,
    SIGN_IN_SUCCESS,
    SIGN_OUT,
    SIGN_OUT_SUCCESS,
    GET_USER_INFO,
    GET_USER_INFO_SUCCESS,
    GET_USER_INFO_ERROR,
    UPDATE_PASSWORD,
    UPDATE_PROFILE,
} from './actionTypes';

export const signIn = (signinData) => ({
    type: SIGN_IN,
    signinData
})

export const signInSuccess = (userData) => ({
    type: SIGN_IN_SUCCESS,
    userData
})

export const signOut = (cb) => ({
    type: SIGN_OUT,
    cb
})

export const signOutSuccess = (userData) => ({
    type: SIGN_OUT_SUCCESS,
    userData
})

export const getUserInfo = (cb) => ({
    type: GET_USER_INFO,
    cb
})

export const getUserInfoSuccess = (userData) => ({
    type: GET_USER_INFO_SUCCESS,
    userData
})

export const getUserInfoError = () => ({
    type: GET_USER_INFO_ERROR
})

export const updatePassword = (passwordData) => ({
    type: UPDATE_PASSWORD,
    passwordData
})

export const updateProfile = (profileData) => ({
    type: UPDATE_PROFILE,
    profileData
})
