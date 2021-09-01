import { takeEvery } from 'redux-saga/effects';
import {
    SIGN_IN,
    SIGN_OUT,
    GET_USER_INFO,
    UPDATE_PASSWORD,
    UPDATE_PROFILE,
    GET_PRODUCT_CATEGORIES,
    GET_PRODUCTS,
    GET_TOP_FEATURED_PRODUCTS,
    GET_TOP_NEW_PRODUCTS,
    GET_TOP_VIEW_PRODUCTS,
    GET_COLORS,
    GET_SIZES,
    GET_CARTS,
    GET_ORDERS,
    GET_FAVORITE_PRODUCTS,
    CREATE_CART,
    UPDATE_CART,
    DELETE_CART,
    DELETE_ALL_CART,
    GET_TOP_SALES_PRODUCTS
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
} from './productCategories';

import {
    getProductsSaga,
    getTopFeaturedProductsSaga,
    getTopNewProductsSaga,
    getTopViewProductsSaga,
    getTopSalesProductsSaga,
} from './products';

import {
    getSizesSaga,
} from './sizes';

import {
    getColorsSaga,
} from './colors';

import {
    getFavoriteProductsSaga,
} from './favoriteProducts';

import { getOrdersSaga } from './orders';

import {
    deleteAllCartSaga,
    getCartsSaga,
    createCartSaga,
    updateCartSaga,
    deleteCartSaga,
} from './carts';

export function* watchAuth() {
    yield takeEvery(SIGN_IN, signInSaga);
    yield takeEvery(SIGN_OUT, signOutSaga);
    yield takeEvery(GET_USER_INFO, getInfoUserSaga);
    yield takeEvery(UPDATE_PASSWORD, updatePasswordSaga);
    yield takeEvery(UPDATE_PROFILE, updateProfileSaga);
}

export function* watchProductCategories() {
    yield takeEvery(GET_PRODUCT_CATEGORIES, getProductCategoriesSaga);
}

export function* watchFavoriteProducts() {
    yield takeEvery(GET_FAVORITE_PRODUCTS, getFavoriteProductsSaga);
}

export function* watchProducts() {
    yield takeEvery(GET_PRODUCTS, getProductsSaga);
    yield takeEvery(GET_TOP_FEATURED_PRODUCTS, getTopFeaturedProductsSaga);
    yield takeEvery(GET_TOP_NEW_PRODUCTS, getTopNewProductsSaga);
    yield takeEvery(GET_TOP_VIEW_PRODUCTS, getTopViewProductsSaga);
    yield takeEvery(GET_TOP_SALES_PRODUCTS, getTopSalesProductsSaga);
}

export function* watchColors() {
    yield takeEvery(GET_COLORS, getColorsSaga);
}

export function* watchSizes() {
    yield takeEvery(GET_SIZES, getSizesSaga);
}

export function* watchCarts() {
    yield takeEvery(GET_CARTS, getCartsSaga);
    yield takeEvery(CREATE_CART, createCartSaga);
    yield takeEvery(UPDATE_CART, updateCartSaga);
    yield takeEvery(DELETE_CART, deleteCartSaga);
    yield takeEvery(DELETE_ALL_CART, deleteAllCartSaga);
}

export function* watchOrders() {
    yield takeEvery(GET_ORDERS, getOrdersSaga);
}