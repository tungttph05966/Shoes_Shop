import _ from 'lodash';

import {
    GET_ORDERS_SUCCESS,
    GET_ORDERS_ERROR,
} from '../actions/actionTypes';

const initialState = {
    orders: {
        data: [],
        page: 0,
        total: 0,
        perPage: 0,
    }
}

const getOrdersSuccess = (state, action) => {
    return {
        ...state,
        orders: action.orders,
    }
}

const getOrdersError = (state, action) => {
    return {
        ...state,
        orders: initialState.orders,
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ORDERS_SUCCESS:
            return getOrdersSuccess(state, action);
        case GET_ORDERS_ERROR:
            return getOrdersError(state, action);
        default:
            return state;
    }
}

export default reducer;
