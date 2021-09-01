import { put } from "redux-saga/effects";
import { toast } from 'react-toastify';

import {
    getColorsSuccess,
    getColorsError,
    toggleLoading,
} from '../../actions';
import {
    getColors,
    createColor,
    updateColor,
    deleteColor,
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

export function* createColorSaga(action) {
    try {
        let result = yield createColor(action.color);

        if (result.data) {
            toast.success('Tạo màu sản phẩm mới thành công.');
            if (action.cb) {
                action.cb();
            }
        } else {
            toast.error('Đã có lỗi xảy ra, vui lòng thử lại sau!');
        }
    } catch (error) {
        toast.error(error.response && error.response.data && error.response.data.message ? error.response.data.message : 'Đã có lỗi xảy ra, vui lòng thử lại sau!');
    }
}

export function* updateColorSaga(action) {
    try {
        let result = yield updateColor(action.color.id, action.color);

        if (result.data) {
            toast.success('Chỉnh sửa màu sản phẩm thành công.');
            if (action.cb) {
                action.cb();
            }
        } else {
            toast.error('Đã có lỗi xảy ra, vui lòng thử lại sau!');
        }
    } catch (error) {
        toast.error(error.response && error.response.data && error.response.data.message ? error.response.data.message : 'Đã có lỗi xảy ra, vui lòng thử lại sau!');
    }
}

export function* deleteColorSaga(action) {
    try {
        let result = yield deleteColor(action.colorId);

        if (result.data) {
            toast.success('Xóa màu sản phẩm thành công.');
            if (action.cb) {
                action.cb();
            }
        } else {
            toast.error('Đã có lỗi xảy ra, vui lòng thử lại sau!');
        }
    } catch (error) {
        toast.error(error.response && error.response.data && error.response.data.message ? error.response.data.message : 'Đã có lỗi xảy ra, vui lòng thử lại sau!');
    }
}
