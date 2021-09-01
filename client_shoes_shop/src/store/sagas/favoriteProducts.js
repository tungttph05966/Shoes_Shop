import { put } from "redux-saga/effects";
import { toast } from 'react-toastify';

import {
    getFavoriteProductsSuccess,
    getFavoriteProductsError,
} from '../../actions';
import {
    getProductFavorites,
} from '../../networks';

export function* getFavoriteProductsSaga(action) {
    try {
        let result = yield getProductFavorites(action.params);

        if (result.data && result.data.data) {
            yield put(getFavoriteProductsSuccess(result.data.data));
        } else {
            toast.error('Đã có lỗi xảy ra, vui lòng thử lại sau!');
            yield put(getFavoriteProductsError());
        }
    } catch (error) {
        toast.error(error.response && error.response.data && error.response.data.message ? error.response.data.message : 'Đã có lỗi xảy ra, vui lòng thử lại sau!');
        yield put(getFavoriteProductsError());
    }
}