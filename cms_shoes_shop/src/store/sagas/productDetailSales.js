import { put } from "redux-saga/effects";
import { toast } from 'react-toastify';

import {
    getProductDetailSalesSuccess,
    getProductDetailSalesError,
    toggleLoading,
} from '../../actions';
import {
    getProductDetailSales,
    createProductDetailSale,
    updateProductDetailSale,
    deleteProductDetailSale,
} from '../../networks';

export function* getProductDetailSalesSaga(action) {
    try {
        let result = yield getProductDetailSales(action.params);

        if (result.data && result.data.data) {
            yield put(getProductDetailSalesSuccess(result.data.data));
        } else {
            toast.error('Đã có lỗi xảy ra, vui lòng thử lại sau!');
            yield put(getProductDetailSalesError());
        }
    } catch (error) {
        toast.error(error.response && error.response.data && error.response.data.message ? error.response.data.message : 'Đã có lỗi xảy ra, vui lòng thử lại sau!');
        yield put(getProductDetailSalesError());
    }
}

export function* createProductDetailSaleSaga(action) {
    try {
        let result = yield createProductDetailSale(action.productDetailSale);

        if (result.data) {
            toast.success('Tạo khuyến mãi mới thành công.');
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

export function* updateProductDetailSaleSaga(action) {
    try {
        let result = yield updateProductDetailSale(action.productDetailSale.id, action.productDetailSale);

        if (result.data) {
            toast.success('Chỉnh sửa khuyến mãi thành công.');
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

export function* deleteProductDetailSaleSaga(action) {
    try {
        let result = yield deleteProductDetailSale(action.productDetailSaleId);

        if (result.data) {
            toast.success('Xóa khuyến mãi thành công.');
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
