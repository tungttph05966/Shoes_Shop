import { axios } from './index.js';

const SIZES_URL = '/sizes'

export function getSizes (params) {
    return axios.get(
        `${SIZES_URL}`,
        {
            params: params || {}
        }
    );
}

export function getSizeOptions (params) {
    return axios.get(
        `${SIZES_URL}/options`,
    );
}

export function getSingleSize (id) {
    return axios.get(
        `${SIZES_URL}/${id}`,
    );
}

export function createSize (size) {
    return axios.post(
        `${SIZES_URL}`,
        size,
    );
}

export function updateSize (id, size) {
    return axios.put(
        `${SIZES_URL}/${id}`,
        size,
    );
}

export function deleteSize (id) {
    return axios.delete(
        `${SIZES_URL}/${id}`,
    );
}
