import { put } from "redux-saga/effects";
import { toast } from 'react-toastify';

import {
    getSizesSuccess,
    getSizesError,
    toggleLoading,
} from '../../actions';
import {
    getSizes,
} from '../../networks';

export function* getSizesSaga(action) {
    try {
        let result = yield getSizes(action.params);

        if (result.data && result.data.data) {
            yield put(getSizesSuccess(result.data.data));
        } else {
            toast.error('Đã có lỗi xảy ra, vui lòng thử lại sau!');
            yield put(getSizesError());
        }
    } catch (error) {
        toast.error(error.response && error.response.data && error.response.data.message ? error.response.data.message : 'Đã có lỗi xảy ra, vui lòng thử lại sau!');
        yield put(getSizesError());
    }
}