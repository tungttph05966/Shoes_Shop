import {
    GET_PRODUCT_CATEGORIES,
    GET_PRODUCT_CATEGORIES_ERROR,
    GET_PRODUCT_CATEGORIES_SUCCESS,
} from './actionTypes';

export const getProductCategories = (params) => ({
    type: GET_PRODUCT_CATEGORIES,
    params
})

export const getProductCategoriesSuccess = (productCategories) => ({
    type: GET_PRODUCT_CATEGORIES_SUCCESS,
    productCategories
})

export const getProductCategoriesError = () => ({
    type: GET_PRODUCT_CATEGORIES_ERROR
})