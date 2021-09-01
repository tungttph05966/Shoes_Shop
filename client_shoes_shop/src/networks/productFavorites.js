import { axios } from './index.js';

const FAVORITES_URL = '/fe/favorites'

export function getProductFavorites (params) {
    return axios.get(
        `${FAVORITES_URL}`,
        {
            params: params || {}
        }
    );
}

export function createProductFavorites (favoriteProduct) {
    return axios.post(
        `${FAVORITES_URL}`,
        favoriteProduct,
    );
}

export function deleteProductFavorites (product_id) {
    return axios.delete(
        `${FAVORITES_URL}/${product_id}`,
    )
}