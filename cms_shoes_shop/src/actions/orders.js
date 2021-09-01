import {
    GET_ORDERS,
    GET_ORDERS_ERROR,
    GET_ORDERS_SUCCESS,
    UPDATE_ORDER,
} from './actionTypes';

export const getOrders = (params) => ({
    type: GET_ORDERS,
    params
})

export const getOrdersSuccess = (orders) => ({
    type: GET_ORDERS_SUCCESS,
    orders
})

export const getOrdersError = () => ({
    type: GET_ORDERS_ERROR
})

export const updateOrder = (order, cb) => ({
    type: UPDATE_ORDER,
    order,
    cb,
})