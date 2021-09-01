import { put } from "redux-saga/effects";
import { toast } from 'react-toastify';

import {
    getProductsSuccess,
    getProductsError,
    getTopNewProductsSuccess,
    getTopNewProductsError,
    getTopFeaturedProductsSuccess,
    getTopFeaturedProductsError,
    getTopViewProductsSuccess,
    getTopViewProductsError,
    getTopSalesProductsSuccess,
    getTopSalesProductsError,
} from '../../actions';
import {
    getProducts,
    getTopFeaturedProducts,
    getTopViewProducts,
    getTopNewProducts,
    getTopSalesProducts,
} from '../../networks';

export function* getProductsSaga(action) {
    try {
        let result = yield getProducts(action.params);

        if (result.data && result.data.data) {
            yield put(getProductsSuccess(result.data.data));
        } else {
            toast.error('Đã có lỗi xảy ra, vui lòng thử lại sau!');
            yield put(getProductsError());
        }
    } catch (error) {
        toast.error(error.response && error.response.data && error.response.data.message ? error.response.data.message : 'Đã có lỗi xảy ra, vui lòng thử lại sau!');
        yield put(getProductsError());
    }
}

export function* getTopNewProductsSaga(action) {
    try {
        let result = yield getTopNewProducts(action.params);

        if (result.data && result.data.data) {
            yield put(getTopNewProductsSuccess(result.data.data));
        } else {
            toast.error('Đã có lỗi xảy ra, vui lòng thử lại sau!');
            yield put(getTopNewProductsError());
        }
    } catch (error) {
        toast.error(error.response && error.response.data && error.response.data.message ? error.response.data.message : 'Đã có lỗi xảy ra, vui lòng thử lại sau!');
        yield put(getTopNewProductsError());
    }
}

export function* getTopFeaturedProductsSaga(action) {
    try {
        let result = yield getTopFeaturedProducts(action.params);

        if (result.data && result.data.data) {
            yield put(getTopFeaturedProductsSuccess(result.data.data));
        } else {
            toast.error('Đã có lỗi xảy ra, vui lòng thử lại sau!');
            yield put(getTopFeaturedProductsError());
        }
    } catch (error) {
        toast.error(error.response && error.response.data && error.response.data.message ? error.response.data.message : 'Đã có lỗi xảy ra, vui lòng thử lại sau!');
        yield put(getTopFeaturedProductsError());
    }
}

export function* getTopViewProductsSaga(action) {
    try {
        let result = yield getTopViewProducts(action.params);

        if (result.data && result.data.data) {
            yield put(getTopViewProductsSuccess(result.data.data));
        } else {
            toast.error('Đã có lỗi xảy ra, vui lòng thử lại sau!');
            yield put(getTopViewProductsError());
        }
    } catch (error) {
        toast.error(error.response && error.response.data && error.response.data.message ? error.response.data.message : 'Đã có lỗi xảy ra, vui lòng thử lại sau!');
        yield put(getTopViewProductsError());
    }
}

export function* getTopSalesProductsSaga(action) {
    try {
        let result = yield getTopSalesProducts(action.params);

        if (result.data && result.data.data) {
            yield put(getTopSalesProductsSuccess(result.data.data));
        } else {
            toast.error('Đã có lỗi xảy ra, vui lòng thử lại sau!');
            yield put(getTopSalesProductsError());
        }
    } catch (error) {
        toast.error(error.response && error.response.data && error.response.data.message ? error.response.data.message : 'Đã có lỗi xảy ra, vui lòng thử lại sau!');
        yield put(getTopSalesProductsError());
    }
}