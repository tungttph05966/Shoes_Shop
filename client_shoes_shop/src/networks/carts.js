import { axios } from './index.js';

const CARTS_URL = '/fe/carts'

export function getCarts (params) {
    return axios.get(
        `${CARTS_URL}`,
        {
            params: params || {}
        }
    );
}

export function createCart (cart) {
    return axios.post(
        `${CARTS_URL}`,
        cart,
    );
}

export function updateCart (id, cart) {
    return axios.put(
        `${CARTS_URL}/${id}`,
        cart,
    );
}

export function deleteCart (id) {
    return axios.delete(
        `${CARTS_URL}/${id}`,
    );
}

export function emptyCart (id) {
    return axios.post(
        `${CARTS_URL}/delete-all`,
    );
}
