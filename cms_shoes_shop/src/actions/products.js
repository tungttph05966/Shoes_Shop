import {
    GET_PRODUCTS,
    GET_PRODUCTS_ERROR,
    GET_PRODUCTS_SUCCESS,
    UPDATE_PRODUCT,
    CREATE_PRODUCT,
    DELETE_PRODUCT,
} from './actionTypes';

export const getProducts = (params) => ({
    type: GET_PRODUCTS,
    params
})

export const getProductsSuccess = (products) => ({
    type: GET_PRODUCTS_SUCCESS,
    products
})

export const getProductsError = () => ({
    type: GET_PRODUCTS_ERROR
})

export const createProduct = (product, cb) => ({
    type: CREATE_PRODUCT,
    product,
    cb,
})

export const updateProduct = (product, cb) => ({
    type: UPDATE_PRODUCT,
    product,
    cb,
})

export const deleteProduct = (productId, cb) => ({
    type: DELETE_PRODUCT,
    productId,
    cb,
})