import { axios } from './index.js';

const STATISTICS_URL = '/statistics'

export function getTotalOrder (params) {
    return axios.get(
        `${STATISTICS_URL}/order`,
        {
            params: params || {},
        }
    );
}

export function getTotalIncome (params) {
    return axios.get(
        `${STATISTICS_URL}/income`,
        {
            params: params || {},
        }
    );
}

export function getInventory (params) {
    return axios.get(
        `${STATISTICS_URL}/inventory`,
        {
            params: params || {},
        }
    );
}