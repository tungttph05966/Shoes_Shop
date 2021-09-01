import {
    GET_FAVORITE_PRODUCTS,
    GET_FAVORITE_PRODUCTS_ERROR,
    GET_FAVORITE_PRODUCTS_SUCCESS,
} from './actionTypes';

export const getFavoriteProducts = (params) => ({
    type: GET_FAVORITE_PRODUCTS,
    params
})

export const getFavoriteProductsSuccess = (favoriteProducts) => ({
    type: GET_FAVORITE_PRODUCTS_SUCCESS,
    favoriteProducts
})

export const getFavoriteProductsError = () => ({
    type: GET_FAVORITE_PRODUCTS_ERROR
})