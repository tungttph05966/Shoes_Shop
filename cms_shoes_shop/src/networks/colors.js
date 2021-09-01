import { axios } from './index.js';

const COLORS_URL = '/colors'

export function getColors (params) {
    return axios.get(
        `${COLORS_URL}`,
        {
            params: params || {}
        }
    );
}

export function getColorOptions (params) {
    return axios.get(
        `${COLORS_URL}/options`,
    );
}

export function getSingleColor (id) {
    return axios.get(
        `${COLORS_URL}/${id}`,
    );
}

export function createColor (color) {
    return axios.post(
        `${COLORS_URL}`,
        color,
    );
}

export function updateColor (id, color) {
    return axios.put(
        `${COLORS_URL}/${id}`,
        color,
    );
}

export function deleteColor (id) {
    return axios.delete(
        `${COLORS_URL}/${id}`,
    );
}
