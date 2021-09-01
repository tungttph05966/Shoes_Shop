import _ from 'lodash';

import {
    SIGN_IN_SUCCESS,
    SIGN_OUT_SUCCESS,
    GET_USER_INFO_SUCCESS,
    GET_USER_INFO_ERROR,
} from '../actions/actionTypes';

const initialState = {
    isAuth: false,
    isCheckAuth: false,
    userInfo: {
        address: "",
        email: "",
        fullname: "",
        id: 0,
        phone: "",
        username: "",
    },
}

const signInSuccess = (state, action) => {
    return {
        ...state,
        isAuth: true,
        userInfo: action.userData,
    }
}

const signOutSuccess = (state, action) => {
    return {
        ...state,
        isAuth: false,
        isCheckAuth: true,
        userInfo: initialState.userInfo,
    }
}

const getUserInfoSuccess = (state, action) => {
    return {
        ...state,
        isAuth: true,
        isCheckAuth: true,
        userInfo: action.userData,
    }
}

const getUserInfoError = (state, action) => {
    return {
        ...state,
        isAuth: false,
        isCheckAuth: true,
        userInfo: initialState.userInfo,
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_INFO_SUCCESS:
            return getUserInfoSuccess(state, action);
        case GET_USER_INFO_ERROR:
            return getUserInfoError(state, action);
        case SIGN_IN_SUCCESS:
            return signInSuccess(state, action);
        case SIGN_OUT_SUCCESS:
            return signOutSuccess(state, action);
        default:
            return state;
    }
}

export default reducer;
