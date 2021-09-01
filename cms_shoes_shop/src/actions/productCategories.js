import {
    GET_PRODUCT_CATEGORIES,
    GET_PRODUCT_CATEGORIES_ERROR,
    GET_PRODUCT_CATEGORIES_SUCCESS,
    CREATE_PRODUCT_CATEGORY,
    UPDATE_PRODUCT_CATEGORY,
    DELETE_PRODUCT_CATEGORY,
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

export const createProductCategory = (productCategory, cb) => ({
    type: CREATE_PRODUCT_CATEGORY,
    productCategory,
    cb,
})

export const updateProductCategory = (productCategory, cb) => ({
    type: UPDATE_PRODUCT_CATEGORY,
    productCategory,
    cb,
})

export const deleteProductCategory = (productCategoryId, cb) => ({
    type: DELETE_PRODUCT_CATEGORY,
    productCategoryId,
    cb,
})