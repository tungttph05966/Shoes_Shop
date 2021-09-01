import _ from 'lodash';

import {
    GET_PRODUCT_CATEGORIES_ERROR,
    GET_PRODUCT_CATEGORIES_SUCCESS,
} from '../actions/actionTypes';

const initialState = {
    productCategories: [],
}

const getProductCategoriesSuccess = (state, action) => {
    return {
        ...state,
        productCategories: action.productCategories,
    }
}

const getProductCategoriesError = (state, action) => {
    return {
        ...state,
        productCategories: initialState.productCategories,
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODUCT_CATEGORIES_SUCCESS:
            return getProductCategoriesSuccess(state, action);
        case GET_PRODUCT_CATEGORIES_ERROR:
            return getProductCategoriesError(state, action);
        default:
            return state;
    }
}

export default reducer;
