import { axios } from './index.js';

const PRODUCT_DETAIL_SALES_URL = '/productdetailsales'

export function getProductDetailSales (params) {
    return axios.get(
        `${PRODUCT_DETAIL_SALES_URL}`,
        {
            params: params || {}
        }
    );
}

export function getSingleProductDetailSale (id) {
    return axios.get(
        `${PRODUCT_DETAIL_SALES_URL}/${id}`,
    );
}

export function createProductDetailSale (productDetailSale) {
    return axios.post(
        `${PRODUCT_DETAIL_SALES_URL}`,
        productDetailSale,
    );
}

export function updateProductDetailSale (id, productDetailSale) {
    return axios.put(
        `${PRODUCT_DETAIL_SALES_URL}/${id}`,
        productDetailSale,
    );
}

export function deleteProductDetailSale (id) {
    return axios.delete(
        `${PRODUCT_DETAIL_SALES_URL}/${id}`,
    );
}
