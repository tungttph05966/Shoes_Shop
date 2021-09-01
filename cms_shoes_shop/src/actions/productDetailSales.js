import {
    GET_PRODUCT_DETAIL_SALES,
    GET_PRODUCT_DETAIL_SALES_ERROR,
    GET_PRODUCT_DETAIL_SALES_SUCCESS,
    UPDATE_PRODUCT_DETAIL_SALE,
    CREATE_PRODUCT_DETAIL_SALE,
    DELETE_PRODUCT_DETAIL_SALE,
} from './actionTypes';

export const getProductDetailSales = (params) => ({
    type: GET_PRODUCT_DETAIL_SALES,
    params
})

export const getProductDetailSalesSuccess = (productDetailSales) => ({
    type: GET_PRODUCT_DETAIL_SALES_SUCCESS,
    productDetailSales
})

export const getProductDetailSalesError = () => ({
    type: GET_PRODUCT_DETAIL_SALES_ERROR
})

export const createProductDetailSale = (productDetailSale, cb) => ({
    type: CREATE_PRODUCT_DETAIL_SALE,
    productDetailSale,
    cb,
})

export const updateProductDetailSale = (productDetailSale, cb) => ({
    type: UPDATE_PRODUCT_DETAIL_SALE,
    productDetailSale,
    cb,
})

export const deleteProductDetailSale = (productDetailSaleId, cb) => ({
    type: DELETE_PRODUCT_DETAIL_SALE,
    productDetailSaleId,
    cb,
})