import {
    GET_COLORS,
    GET_COLORS_ERROR,
    GET_COLORS_SUCCESS,
} from './actionTypes';

export const getColors = (params) => ({
    type: GET_COLORS,
    params
})

export const getColorsSuccess = (colors) => ({
    type: GET_COLORS_SUCCESS,
    colors
})

export const getColorsError = () => ({
    type: GET_COLORS_ERROR
})