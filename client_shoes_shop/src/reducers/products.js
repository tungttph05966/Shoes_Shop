import _ from 'lodash';

import {
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_ERROR,
    GET_TOP_SALES_PRODUCTS_SUCCESS,
    GET_TOP_SALES_PRODUCTS_ERROR,
    GET_TOP_NEW_PRODUCTS_SUCCESS,
    GET_TOP_NEW_PRODUCTS_ERROR,
    GET_TOP_FEATURED_PRODUCTS_SUCCESS,
    GET_TOP_FEATURED_PRODUCTS_ERROR,
    GET_TOP_VIEW_PRODUCTS_SUCCESS,
    GET_TOP_VIEW_PRODUCTS_ERROR,
} from '../actions/actionTypes';

const initialState = {
    products: {
        data: [],
        page: 0,
        total: 0,
        perPage: 0,
        totalPage: 1,
    },
    topViewProducts: [],
    topSalesProducts: [],
    topNewProducts: [],
    topFeaturedProducts: []
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

const getTopSalesProductsSuccess = (state, action) => {
    return {
        ...state,
        topSalesProducts: action.products,
    }
}

const getTopSalesProductsError = (state, action) => {
    return {
        ...state,
        topSalesProducts: initialState.topViewProducts,
    }
}

const getTopViewProductsSuccess = (state, action) => {
    return {
        ...state,
        topViewProducts: action.products,
    }
}

const getTopViewProductsError = (state, action) => {
    return {
        ...state,
        topViewProducts: initialState.topViewProducts,
    }
}

const getTopNewProductsSuccess = (state, action) => {
    return {
        ...state,
        topNewProducts: action.products,
    }
}

const getTopNewProductsError = (state, action) => {
    return {
        ...state,
        topNewProducts: initialState.topNewProducts,
    }
}

const getTopFeaturedProductsSuccess = (state, action) => {
    return {
        ...state,
        topFeaturedProducts: action.products,
    }
}

const getTopFeaturedProductsError = (state, action) => {
    return {
        ...state,
        topFeaturedProducts: initialState.topFeaturedProducts,
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODUCTS_SUCCESS:
            return getProductsSuccess(state, action);
        case GET_PRODUCTS_ERROR:
            return getProductsError(state, action);
        case GET_TOP_SALES_PRODUCTS_SUCCESS:
            return getTopSalesProductsSuccess(state, action);
        case GET_TOP_SALES_PRODUCTS_ERROR:
            return getTopSalesProductsError(state, action);
        case GET_TOP_FEATURED_PRODUCTS_SUCCESS:
            return getTopFeaturedProductsSuccess(state, action);
        case GET_TOP_FEATURED_PRODUCTS_ERROR:
            return getTopFeaturedProductsError(state, action);
        case GET_TOP_NEW_PRODUCTS_SUCCESS:
            return getTopNewProductsSuccess(state, action);
        case GET_TOP_NEW_PRODUCTS_ERROR:
            return getTopNewProductsError(state, action);
        case GET_TOP_VIEW_PRODUCTS_SUCCESS:
            return getTopViewProductsSuccess(state, action);
        case GET_TOP_VIEW_PRODUCTS_ERROR:
            return getTopViewProductsError(state, action);
        default:
            return state;
    }
}

export default reducer;
