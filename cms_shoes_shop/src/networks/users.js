import { axios } from './index.js';

const USERS_URL = '/users'

export function getUsers (params) {
    return axios.get(
        `${USERS_URL}`,
        {
            params: params || {}
        }
    );
}

export function getUserOptions (params) {
    return axios.get(
        `${USERS_URL}/options`,
    );
}

export function getSingleUser (id) {
    return axios.get(
        `${USERS_URL}/${id}`,
    );
}

export function createUser (user) {
    return axios.post(
        `${USERS_URL}`,
        user,
    );
}

export function updateUser (id, user) {
    return axios.put(
        `${USERS_URL}/${id}`,
        user,
    );
}

export function deleteUser (id) {
    return axios.delete(
        `${USERS_URL}/${id}`,
    );
}
