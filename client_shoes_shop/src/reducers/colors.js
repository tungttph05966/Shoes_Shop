import _ from 'lodash';

import {
    GET_COLORS_SUCCESS,
    GET_COLORS_ERROR,
} from '../actions/actionTypes';

const initialState = {
    colors: [],
}

const getColorsSuccess = (state, action) => {
    return {
        ...state,
        colors: action.colors,
    }
}

const getColorsError = (state, action) => {
    return {
        ...state,
        colors: initialState.colors,
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_COLORS_SUCCESS:
            return getColorsSuccess(state, action);
        case GET_COLORS_ERROR:
            return getColorsError(state, action);
        default:
            return state;
    }
}

export default reducer;
