import { axios } from './index.js';

const COLORS_URL = '/fe/products/colors'

export function getColors (params) {
    return axios.get(
        `${COLORS_URL}`,
        {
            params: params || {}
        }
    );
}