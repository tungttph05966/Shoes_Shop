import {
    GET_PRODUCTS,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_ERROR,
    GET_TOP_NEW_PRODUCTS,
    GET_TOP_NEW_PRODUCTS_SUCCESS,
    GET_TOP_NEW_PRODUCTS_ERROR,
    GET_TOP_FEATURED_PRODUCTS,
    GET_TOP_FEATURED_PRODUCTS_SUCCESS,
    GET_TOP_FEATURED_PRODUCTS_ERROR,
    GET_TOP_VIEW_PRODUCTS,
    GET_TOP_VIEW_PRODUCTS_SUCCESS,
    GET_TOP_VIEW_PRODUCTS_ERROR,
    GET_TOP_SALES_PRODUCTS,
    GET_TOP_SALES_PRODUCTS_SUCCESS,
    GET_TOP_SALES_PRODUCTS_ERROR,
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

export const getTopNewProducts = (params) => ({
    type: GET_TOP_NEW_PRODUCTS,
    params
})

export const getTopFeaturedProducts = (params) => ({
    type: GET_TOP_FEATURED_PRODUCTS,
    params
})

export const getTopViewProducts = (params) => ({
    type: GET_TOP_VIEW_PRODUCTS,
    params
})

export const getTopSalesProducts = (params) => ({
    type: GET_TOP_SALES_PRODUCTS,
    params
})

export const getTopSalesProductsSuccess = (products) => ({
    type: GET_TOP_SALES_PRODUCTS_SUCCESS,
    products
})

export const getTopSalesProductsError = () => ({
    type: GET_TOP_SALES_PRODUCTS_ERROR
})

export const getTopNewProductsSuccess = (products) => ({
    type: GET_TOP_NEW_PRODUCTS_SUCCESS,
    products
})

export const getTopNewProductsError = () => ({
    type: GET_TOP_NEW_PRODUCTS_ERROR
})

export const getTopFeaturedProductsSuccess = (products) => ({
    type: GET_TOP_FEATURED_PRODUCTS_SUCCESS,
    products
})

export const getTopFeaturedProductsError = () => ({
    type: GET_TOP_FEATURED_PRODUCTS_ERROR
})

export const getTopViewProductsSuccess = (products) => ({
    type: GET_TOP_VIEW_PRODUCTS_SUCCESS,
    products
})

export const getTopViewProductsError = () => ({
    type: GET_TOP_VIEW_PRODUCTS_ERROR
})