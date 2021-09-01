import _ from 'lodash';

import {
    GET_FAVORITE_PRODUCTS_ERROR,
    GET_FAVORITE_PRODUCTS_SUCCESS,
} from '../actions/actionTypes';

const initialState = {
    favoriteProducts: {
        data: [],
        page: 0,
        total: 0,
        perPage: 0,
        totalPage: 1,
    },
}

const getFavoriteProductsSuccess = (state, action) => {
    return {
        ...state,
        favoriteProducts: action.favoriteProducts,
    }
}

const getFavoriteProductsError = (state, action) => {
    return {
        ...state,
        favoriteProducts: initialState.favoriteProducts,
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_FAVORITE_PRODUCTS_SUCCESS:
            return getFavoriteProductsSuccess(state, action);
        case GET_FAVORITE_PRODUCTS_ERROR:
            return getFavoriteProductsError(state, action);
        default:
            return state;
    }
}

export default reducer;
