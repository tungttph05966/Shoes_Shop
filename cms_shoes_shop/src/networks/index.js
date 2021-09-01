import Axios from 'axios';

import { TOGGLE_LOADING } from '../actions/actionTypes';
import store from '../store';

const instance = Axios.create({
    baseURL: `${process.env.REACT_APP_API_BASE_URL}/api`,
    withCredentials: true,
});

instance.interceptors.request.use(async function (config) {
    store.dispatch({
        type: TOGGLE_LOADING,
        loading: true,
    });
    return config;
}, function (error) {
    if (error && error.message && error.message === 'Network Error') {
    }

    store.dispatch({
        type: TOGGLE_LOADING,
        loading: false,
    });
    return Promise.reject(error);
});

instance.interceptors.response.use(async function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    store.dispatch({
        type: TOGGLE_LOADING,
        loading: false,
    });
    
    return response;
}, function (error) {
    store.dispatch({
        type: TOGGLE_LOADING,
        loading: false,
    });
    return Promise.reject(error);
});

export const axios = instance;

export * from './auth';
export * from './productCategories';
export * from './users';
export * from './products';
export * from './dashboards';
export * from './productDetailSales';
export * from './orders';
export * from './colors';
export * from './sizes';
export * from './fileUpload';
export * from './statistics';
