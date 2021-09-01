import {
    GET_ORDERS,
    GET_ORDERS_ERROR,
    GET_ORDERS_SUCCESS,
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