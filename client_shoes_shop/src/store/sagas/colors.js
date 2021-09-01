import { put } from "redux-saga/effects";
import { toast } from 'react-toastify';

import {
    getColorsSuccess,
    getColorsError,
    toggleLoading,
} from '../../actions';
import {
    getColors,
} from '../../networks';

export function* getColorsSaga(action) {
    try {
        let result = yield getColors(action.params);

        if (result.data && result.data.data) {
            yield put(getColorsSuccess(result.data.data));
        } else {
            toast.error('Đã có lỗi xảy ra, vui lòng thử lại sau!');
            yield put(getColorsError());
        }
    } catch (error) {
        toast.error(error.response && error.response.data && error.response.data.message ? error.response.data.message : 'Đã có lỗi xảy ra, vui lòng thử lại sau!');
        yield put(getColorsError());
    }
}