import { axios } from './index.js';

const CATEGORIES_URL = '/categories'

export function getProductCategories (params) {
    return axios.get(
        `${CATEGORIES_URL}`,
        {
            params: params || {}
        }
    );
}

export function getProductCategoryOptions (params) {
    return axios.get(
        `${CATEGORIES_URL}/options`,
    );
}

export function getSingleProductCategory (id) {
    return axios.get(
        `${CATEGORIES_URL}/${id}`,
    );
}

export function createProductCategory (productCategory) {
    return axios.post(
        `${CATEGORIES_URL}`,
        productCategory,
    );
}

export function updateProductCategory (id, productCategory) {
    return axios.put(
        `${CATEGORIES_URL}/${id}`,
        productCategory,
    );
}

export function deleteProductCategory (id) {
    return axios.delete(
        `${CATEGORIES_URL}/${id}`,
    );
}
