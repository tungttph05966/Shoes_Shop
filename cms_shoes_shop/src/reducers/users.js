import _ from 'lodash';

import {
    GET_USERS_ERROR,
    GET_USERS_SUCCESS,
} from '../actions/actionTypes';

const initialState = {
    users: {
        data: [],
        page: 0,
        total: 0,
        perPage: 0,
    }
}

const getUsersSuccess = (state, action) => {
    return {
        ...state,
        users: action.users,
    }
}

const getUsersError = (state, action) => {
    return {
        ...state,
        users: initialState.users,
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USERS_SUCCESS:
            return getUsersSuccess(state, action);
        case GET_USERS_ERROR:
            return getUsersError(state, action);
        default:
            return state;
    }
}

export default reducer;
