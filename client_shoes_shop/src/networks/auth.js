import { axios } from './index.js';

const AUTH_URL = '/auth'

export function signIn (signinData) {
    return axios.post(
        `${AUTH_URL}/signin`,
        signinData,
    );
}

export function signUp (signupData) {
    return axios.post(
        `${AUTH_URL}/signup`,
        signupData,
    );
}

export function signOut (signoutData) {
    return axios.post(
        `${AUTH_URL}/signout`,
        signoutData,
    );
}

export function getInfoUser () {
    return axios.get(
        `${AUTH_URL}/check`,
    );
}

export function updatePassword (passwordData) {
    return axios.post(
        `${AUTH_URL}/change-password`,
        passwordData,
    );
}

export function recoverAccount (recoverAccountData) {
    return axios.post(
        `${AUTH_URL}/recover-account`,
        recoverAccountData,
    );
}

export function resetAccount (resetAccountData) {
    return axios.post(
        `${AUTH_URL}/reset-account`,
        resetAccountData,
    );
}

export function changePassword (changePasswordData) {
    return axios.post(
        `${AUTH_URL}/change-password`,
        changePasswordData,
    );
}

export function updateProfile (profileData) {
    return axios.post(
        `${AUTH_URL}/profile`,
        profileData,
    );
}
