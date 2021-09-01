import { axios } from './index.js';

const CATEGORIES_URL = '/fe/categories'

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
