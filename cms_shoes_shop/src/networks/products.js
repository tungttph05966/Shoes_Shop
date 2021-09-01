import { axios } from './index.js';

const PRODUCTS_URL = '/products'

export function getProducts (params) {
    return axios.get(
        `${PRODUCTS_URL}`,
        {
            params: params || {}
        }
    );
}

export function getProductOptions (params) {
    return axios.get(
        `${PRODUCTS_URL}/options`,
    );
}

export function getSingleProduct (id) {
    return axios.get(
        `${PRODUCTS_URL}/${id}`,
    );
}

export function createProduct (product) {
    return axios.post(
        `${PRODUCTS_URL}`,
        product,
    );
}

export function updateProduct (id, product) {
    return axios.put(
        `${PRODUCTS_URL}/${id}`,
        product,
    );
}

export function deleteProduct (id) {
    return axios.delete(
        `${PRODUCTS_URL}/${id}`,
    );
}
