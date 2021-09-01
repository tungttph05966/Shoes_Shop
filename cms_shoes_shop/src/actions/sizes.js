import {
    GET_SIZES,
    GET_SIZES_ERROR,
    GET_SIZES_SUCCESS,
    UPDATE_SIZE,
    CREATE_SIZE,
    DELETE_SIZE,
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

export const createSize = (size, cb) => ({
    type: CREATE_SIZE,
    size,
    cb,
})

export const updateSize = (size, cb) => ({
    type: UPDATE_SIZE,
    size,
    cb,
})

export const deleteSize = (sizeId, cb) => ({
    type: DELETE_SIZE,
    sizeId,
    cb,
})