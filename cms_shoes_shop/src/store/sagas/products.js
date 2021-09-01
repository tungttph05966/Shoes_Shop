import { put } from "redux-saga/effects";
import { toast } from 'react-toastify';

import {
    getProductsSuccess,
    getProductsError,
    toggleLoading,
} from '../../actions';
import {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
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

export function* createProductSaga(action) {
    try {
        let result = yield createProduct(action.product);

        if (result.data) {
            toast.success('Tạo sản phẩm mới thành công.');
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

export function* updateProductSaga(action) {
    try {
        let result = yield updateProduct(action.product.id, action.product);

        if (result.data) {
            toast.success('Chỉnh sửa sản phẩm thành công.');
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

export function* deleteProductSaga(action) {
    try {
        let result = yield deleteProduct(action.productId);

        if (result.data) {
            toast.success('Xóa sản phẩm thành công.');
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
