import { axios } from './index.js';

const SIZES_URL = '/fe/products/sizes'

export function getSizes (params) {
    return axios.get(
        `${SIZES_URL}`,
        {
            params: params || {}
        }
    );
}