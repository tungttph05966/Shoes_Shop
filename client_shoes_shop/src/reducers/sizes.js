import _ from 'lodash';

import {
    GET_SIZES_ERROR,
    GET_SIZES_SUCCESS,
} from '../actions/actionTypes';

const initialState = {
    sizes: [],
}

const getSizesSuccess = (state, action) => {
    return {
        ...state,
        sizes: action.sizes,
    }
}

const getSizesError = (state, action) => {
    return {
        ...state,
        sizes: initialState.sizes,
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SIZES_SUCCESS:
            return getSizesSuccess(state, action);
        case GET_SIZES_ERROR:
            return getSizesError(state, action);
        default:
            return state;
    }
}

export default reducer;
