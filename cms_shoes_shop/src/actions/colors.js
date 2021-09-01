import {
    GET_COLORS,
    GET_COLORS_ERROR,
    GET_COLORS_SUCCESS,
    UPDATE_COLOR,
    CREATE_COLOR,
    DELETE_COLOR,
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

export const createColor = (color, cb) => ({
    type: CREATE_COLOR,
    color,
    cb,
})

export const updateColor = (color, cb) => ({
    type: UPDATE_COLOR,
    color,
    cb,
})

export const deleteColor = (colorId, cb) => ({
    type: DELETE_COLOR,
    colorId,
    cb,
})