import { put } from "redux-saga/effects";
import { toast } from 'react-toastify';

import {
    getCartsSuccess,
    getCartsError,
    toggleLoading,
} from '../../actions';
import {
    getCarts,
    createCart,
    updateCart,
    deleteCart,
    emptyCart,
} from '../../networks';

export function* getCartsSaga(action) {
    try {
        let result = yield getCarts(action.params);

        if (result.data && result.data.data) {
            yield put(getCartsSuccess(result.data.data));
        } else {
            toast.error('Đã có lỗi xảy ra, vui lòng thử lại sau!');
            yield put(getCartsError());
        }
    } catch (error) {
        if (error.response.status != 401) {
            toast.error(error.response && error.response.data && error.response.data.message ? error.response.data.message : 'Đã có lỗi xảy ra, vui lòng thử lại sau!');
        }
        yield put(getCartsError());
    }
}

export function* createCartSaga(action) {
    try {
        let result = yield createCart(action.cart);

        if (result.data) {
            toast.success('Thêm sản phẩm vào giỏ hàng thành công.');
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

export function* updateCartSaga(action) {
    try {
        let result = yield updateCart(action.cart.id, action.cart);

        if (result.data) {
            toast.success('Chỉnh sửa sản phẩm trong giỏ hàng thành công.');
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

export function* deleteCartSaga(action) {
    try {
        let result = yield deleteCart(action.cartId);

        if (result.data) {
            toast.success('Xóa sản phẩm khỏi giỏ hàng thành công.');
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

export function* deleteAllCartSaga(action) {
    try {
        let result = yield emptyCart();

        if (result.data) {
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
