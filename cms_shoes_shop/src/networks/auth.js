import { axios } from './index.js';

const AUTH_URL = '/auth'

export function signIn (signinData) {
    return axios.post(
        `${AUTH_URL}/signin`,
        signinData,
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

export function updateProfile (profileData) {
    return axios.post(
        `${AUTH_URL}/profile`,
        profileData,
    );
}
