import _ from 'lodash';

import {
    GET_PRODUCT_DETAIL_SALES_SUCCESS,
    GET_PRODUCT_DETAIL_SALES_ERROR,
} from '../actions/actionTypes';

const initialState = {
    productDetailSales: {
        data: [],
        page: 0,
        total: 0,
        perPage: 0,
    }
}

const getProductDetailSalesSuccess = (state, action) => {
    return {
        ...state,
        productDetailSales: action.productDetailSales,
    }
}

const getProductDetailSalesError = (state, action) => {
    return {
        ...state,
        productDetailSales: initialState.productDetailSales,
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODUCT_DETAIL_SALES_SUCCESS:
            return getProductDetailSalesSuccess(state, action);
        case GET_PRODUCT_DETAIL_SALES_ERROR:
            return getProductDetailSalesError(state, action);
        default:
            return state;
    }
}

export default reducer;
