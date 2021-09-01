import { put } from "redux-saga/effects";
import { toast } from 'react-toastify';

import {
    getProductCategoriesSuccess,
    getProductCategoriesError,
    toggleLoading,
} from '../../actions';
import {
    getProductCategories,
    createProductCategory,
    updateProductCategory,
    deleteProductCategory,
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

export function* createProductCategorySaga(action) {
    try {
        let result = yield createProductCategory(action.productCategory);

        if (result.data) {
            toast.success('Tạo danh mục mới thành công.');
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

export function* updateProductCategorySaga(action) {
    try {
        let result = yield updateProductCategory(action.productCategory.id, action.productCategory);

        if (result.data) {
            toast.success('Chỉnh sửa danh mục thành công.');
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

export function* deleteProductCategorySaga(action) {
    try {
        let result = yield deleteProductCategory(action.productCategoryId);

        if (result.data) {
            toast.success('Xóa danh mục thành công.');
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
