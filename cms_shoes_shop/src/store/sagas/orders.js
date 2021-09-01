import { put } from "redux-saga/effects";
import { toast } from 'react-toastify';

import {
    getOrdersSuccess,
    getOrdersError,
    toggleLoading,
} from '../../actions';
import {
    getOrders,
    updateOrder,
} from '../../networks';

export function* getOrdersSaga(action) {
    try {
        let result = yield getOrders(action.params);

        if (result.data && result.data.data) {
            yield put(getOrdersSuccess(result.data.data));
        } else {
            toast.error('Đã có lỗi xảy ra, vui lòng thử lại sau!');
            yield put(getOrdersError());
        }
    } catch (error) {
        toast.error(error.response && error.response.data && error.response.data.message ? error.response.data.message : 'Đã có lỗi xảy ra, vui lòng thử lại sau!');
        yield put(getOrdersError());
    }
}

export function* updateOrderSaga(action) {
    try {
        let result = yield updateOrder(action.order.id, action.order);

        if (result.data) {
            toast.success('Chỉnh sửa đơn hàng thành công.');
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
