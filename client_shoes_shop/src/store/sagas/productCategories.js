import { put } from "redux-saga/effects";
import { toast } from 'react-toastify';

import {
    getProductCategoriesSuccess,
    getProductCategoriesError,
} from '../../actions';
import {
    getProductCategories,
} from '../../networks';

export function* getProductCategoriesSaga(action) {
    try {
        let result = yield getProductCategories(action.params);

        if (result.data && result.data.data) {
            yield put(getProductCategoriesSuccess(result.data.data));
        } else {
            toast.error('Đã có lỗi xảy ra, vui lòng thử lại sau!');
            yield put(getProductCategoriesError());
        }
    } catch (error) {
        toast.error(error.response && error.response.data && error.response.data.message ? error.response.data.message : 'Đã có lỗi xảy ra, vui lòng thử lại sau!');
        yield put(getProductCategoriesError());
    }
}