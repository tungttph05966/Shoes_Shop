import { takeEvery } from 'redux-saga/effects';
import {
    SIGN_IN,
    SIGN_OUT,
    GET_USER_INFO,
    UPDATE_PASSWORD,
    UPDATE_PROFILE,
    GET_PRODUCT_CATEGORIES,
    CREATE_PRODUCT_CATEGORY,
    UPDATE_PRODUCT_CATEGORY,
    DELETE_PRODUCT_CATEGORY,
    GET_USERS,
    CREATE_USER,
    UPDATE_USER,
    DELETE_USER,
    GET_PRODUCTS,
    CREATE_PRODUCT,
    UPDATE_PRODUCT,
    DELETE_PRODUCT,
    GET_PRODUCT_DETAIL_SALES,
    CREATE_PRODUCT_DETAIL_SALE,
    UPDATE_PRODUCT_DETAIL_SALE,
    DELETE_PRODUCT_DETAIL_SALE,
    GET_ORDERS,
    UPDATE_ORDER,
    GET_COLORS,
    CREATE_COLOR,
    UPDATE_COLOR,
    DELETE_COLOR,
    GET_SIZES,
    CREATE_SIZE,
    UPDATE_SIZE,
    DELETE_SIZE,
} from '../../actions/actionTypes';

import {
    getInfoUserSaga,
    signInSaga,
    signOutSaga,
    updatePasswordSaga,
    updateProfileSaga,
} from './auth';

import {
    getProductCategoriesSaga,
    createProductCategorySaga,
    updateProductCategorySaga,
    deleteProductCategorySaga,
} from './productCategories';

import {
    getUsersSaga,
    createUserSaga,
    updateUserSaga,
    deleteUserSaga,
} from './users';

import {
    getProductsSaga,
    createProductSaga,
    updateProductSaga,
    deleteProductSaga,
} from './products';

import {
    getSizesSaga,
    createSizeSaga,
    updateSizeSaga,
    deleteSizeSaga,
} from './sizes';

import {
    getColorsSaga,
    createColorSaga,
    updateColorSaga,
    deleteColorSaga,
} from './colors';

import {
    getProductDetailSalesSaga,
    createProductDetailSaleSaga,
    updateProductDetailSaleSaga,
    deleteProductDetailSaleSaga,
} from './productDetailSales';

import {
    getOrdersSaga,
    updateOrderSaga,
} from './orders';

export function* watchAuth() {
    yield takeEvery(SIGN_IN, signInSaga);
    yield takeEvery(SIGN_OUT, signOutSaga);
    yield takeEvery(GET_USER_INFO, getInfoUserSaga);
    yield takeEvery(UPDATE_PASSWORD, updatePasswordSaga);
    yield takeEvery(UPDATE_PROFILE, updateProfileSaga);
}

export function* watchProductCategories() {
    yield takeEvery(GET_PRODUCT_CATEGORIES, getProductCategoriesSaga);
    yield takeEvery(CREATE_PRODUCT_CATEGORY, createProductCategorySaga);
    yield takeEvery(UPDATE_PRODUCT_CATEGORY, updateProductCategorySaga);
    yield takeEvery(DELETE_PRODUCT_CATEGORY, deleteProductCategorySaga);
}

export function* watchUsers() {
    yield takeEvery(GET_USERS, getUsersSaga);
    yield takeEvery(CREATE_USER, createUserSaga);
    yield takeEvery(UPDATE_USER, updateUserSaga);
    yield takeEvery(DELETE_USER, deleteUserSaga);
}

export function* watchProducts() {
    yield takeEvery(GET_PRODUCTS, getProductsSaga);
    yield takeEvery(CREATE_PRODUCT, createProductSaga);
    yield takeEvery(UPDATE_PRODUCT, updateProductSaga);
    yield takeEvery(DELETE_PRODUCT, deleteProductSaga);
}

export function* watchColors() {
    yield takeEvery(GET_COLORS, getColorsSaga);
    yield takeEvery(CREATE_COLOR, createColorSaga);
    yield takeEvery(UPDATE_COLOR, updateColorSaga);
    yield takeEvery(DELETE_COLOR, deleteColorSaga);
}

export function* watchSizes() {
    yield takeEvery(GET_SIZES, getSizesSaga);
    yield takeEvery(CREATE_SIZE, createSizeSaga);
    yield takeEvery(UPDATE_SIZE, updateSizeSaga);
    yield takeEvery(DELETE_SIZE, deleteSizeSaga);
}

export function* watchProductDetailSales() {
    yield takeEvery(GET_PRODUCT_DETAIL_SALES, getProductDetailSalesSaga);
    yield takeEvery(CREATE_PRODUCT_DETAIL_SALE, createProductDetailSaleSaga);
    yield takeEvery(UPDATE_PRODUCT_DETAIL_SALE, updateProductDetailSaleSaga);
    yield takeEvery(DELETE_PRODUCT_DETAIL_SALE, deleteProductDetailSaleSaga);
}

export function* watchOrders() {
    yield takeEvery(GET_ORDERS, getOrdersSaga);
    yield takeEvery(UPDATE_ORDER, updateOrderSaga);
}