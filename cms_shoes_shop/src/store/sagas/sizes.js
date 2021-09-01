import { put } from "redux-saga/effects";
import { toast } from 'react-toastify';

import {
    getSizesSuccess,
    getSizesError,
    toggleLoading,
} from '../../actions';
import {
    getSizes,
    createSize,
    updateSize,
    deleteSize,
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

export function* createSizeSaga(action) {
    try {
        let result = yield createSize(action.size);

        if (result.data) {
            toast.success('Tạo size sản phẩm mới thành công.');
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

export function* updateSizeSaga(action) {
    try {
        let result = yield updateSize(action.size.id, action.size);

        if (result.data) {
            toast.success('Chỉnh sửa size sản phẩm thành công.');
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

export function* deleteSizeSaga(action) {
    try {
        let result = yield deleteSize(action.sizeId);

        if (result.data) {
            toast.success('Xóa size sản phẩm thành công.');
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
