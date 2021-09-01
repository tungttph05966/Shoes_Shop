import {
    GET_SIZES,
    GET_SIZES_ERROR,
    GET_SIZES_SUCCESS,
} from './actionTypes';

export const getSizes = (params) => ({
    type: GET_SIZES,
    params
})

export const getSizesSuccess = (sizes) => ({
    type: GET_SIZES_SUCCESS,
    sizes
})

export const getSizesError = () => ({
    type: GET_SIZES_ERROR
})