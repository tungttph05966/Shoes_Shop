import {
    GET_USERS,
    GET_USERS_ERROR,
    GET_USERS_SUCCESS,
    UPDATE_USER,
    CREATE_USER,
    DELETE_USER,
} from './actionTypes';

export const getUsers = (params) => ({
    type: GET_USERS,
    params
})

export const getUsersSuccess = (users) => ({
    type: GET_USERS_SUCCESS,
    users
})

export const getUsersError = () => ({
    type: GET_USERS_ERROR
})

export const createUser = (user, cb) => ({
    type: CREATE_USER,
    user,
    cb,
})

export const updateUser = (user, cb) => ({
    type: UPDATE_USER,
    user,
    cb,
})

export const deleteUser = (userId, cb) => ({
    type: DELETE_USER,
    userId,
    cb,
})