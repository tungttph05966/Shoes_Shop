import _ from 'lodash';

import {
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_ERROR,
} from '../actions/actionTypes';

const initialState = {
    products: {
        data: [],
        page: 0,
        total: 0,
        perPage: 0,
    }
}

const getProductsSuccess = (state, action) => {
    return {
        ...state,
        products: action.products,
    }
}

const getProductsError = (state, action) => {
    return {
        ...state,
        products: initialState.products,
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODUCTS_SUCCESS:
            return getProductsSuccess(state, action);
        case GET_PRODUCTS_ERROR:
            return getProductsError(state, action);
        default:
            return state;
    }
}

export default reducer;
