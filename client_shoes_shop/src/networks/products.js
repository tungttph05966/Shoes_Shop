import { axios } from './index.js';

const PRODUCTS_URL = '/fe/products'

export function getProducts (params) {
    return axios.get(
        `${PRODUCTS_URL}`,
        {
            params: params || {}
        }
    );
}

export function getSingleProduct (productId) {
    return axios.get(
        `${PRODUCTS_URL}/${productId}/by-slug`
    );
}

export function getTopFeaturedProducts (params) {
    return axios.get(
        `${PRODUCTS_URL}/top-featured`,
        {
            params: params || {}
        }
    );
}

export function getTopViewProducts (params) {
    return axios.get(
        `${PRODUCTS_URL}/top-view`,
        {
            params: params || {}
        }
    );
}

export function getTopNewProducts (params) {
    return axios.get(
        `${PRODUCTS_URL}/top-new`,
        {
            params: params || {}
        }
    );
}

export function getTopSalesProducts (params) {
    return axios.get(
        `${PRODUCTS_URL}/top-sales`,
        {
            params: params || {}
        }
    );
}