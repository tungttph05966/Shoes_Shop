import _ from 'lodash';

import {
    GET_CARTS_SUCCESS,
    GET_CARTS_ERROR,
} from '../actions/actionTypes';

const initialState = {
    carts: []
}

const getCartsSuccess = (state, action) => {
    return {
        ...state,
        carts: action.carts,
    }
}

const getCartsError = (state, action) => {
    return {
        ...state,
        carts: initialState.carts,
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CARTS_SUCCESS:
            return getCartsSuccess(state, action);
        case GET_CARTS_ERROR:
            return getCartsError(state, action);
        default:
            return state;
    }
}

export default reducer;
