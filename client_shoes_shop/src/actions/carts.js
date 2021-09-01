import {
    GET_CARTS,
    GET_CARTS_ERROR,
    GET_CARTS_SUCCESS,
    CREATE_CART,
    UPDATE_CART,
    DELETE_CART,
    DELETE_ALL_CART,
} from './actionTypes';

export const getCarts = (params) => ({
    type: GET_CARTS,
    params
})

export const getCartsSuccess = (carts) => ({
    type: GET_CARTS_SUCCESS,
    carts
})

export const getCartsError = () => ({
    type: GET_CARTS_ERROR
})

export const createCart = (cart, cb) => ({
    type: CREATE_CART,
    cart,
    cb,
})

export const updateCart = (cart, cb) => ({
    type: UPDATE_CART,
    cart,
    cb,
})

export const deleteCart = (cartId, cb) => ({
    type: DELETE_CART,
    cartId,
    cb,
})

export const deleteAllCart = (cb) => ({
    type: DELETE_ALL_CART,
    cb,
})