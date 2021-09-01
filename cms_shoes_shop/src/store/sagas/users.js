import { put } from "redux-saga/effects";
import { toast } from 'react-toastify';

import {
    getUsersError,
    getUsersSuccess,
    toggleLoading,
} from '../../actions';
import {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
} from '../../networks';

export function* getUsersSaga(action) {
    try {
        let result = yield getUsers(action.params);

        if (result.data && result.data.data) {
            yield put(getUsersSuccess(result.data.data));
        } else {
            toast.error('Đã có lỗi xảy ra, vui lòng thử lại sau!');
            yield put(getUsersError());
        }
    } catch (error) {
        toast.error(error.response && error.response.data && error.response.data.message ? error.response.data.message : 'Đã có lỗi xảy ra, vui lòng thử lại sau!');
        yield put(getUsersError());
    }
}

export function* createUserSaga(action) {
    try {
        let result = yield createUser(action.user);

        if (result.data) {
            toast.success('Tạo người dùng mới thành công.');
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

export function* updateUserSaga(action) {
    try {
        let result = yield updateUser(action.user.id, action.user);

        if (result.data) {
            toast.success('Chỉnh sửa người dùng thành công.');
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

export function* deleteUserSaga(action) {
    try {
        let result = yield deleteUser(action.userId);

        if (result.data) {
            toast.success('Xóa người dùng thành công.');
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
