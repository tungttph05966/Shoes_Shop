import { axios } from './index.js';

const ORDERS_URL = '/orders'

export function getOrders (params) {
    return axios.get(
        `${ORDERS_URL}`,
        {
            params: params || {}
        }
    );
}

export function getSingleOrder (id) {
    return axios.get(
        `${ORDERS_URL}/${id}`,
    );
}

export function updateOrder (id, order) {
    return axios.put(
        `${ORDERS_URL}/${id}`,
        order,
    );
}
