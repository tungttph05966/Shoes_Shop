import { put } from "redux-saga/effects";
import { toast } from 'react-toastify';

import {
    signInSuccess,
    signOutSuccess,
    getUserInfoSuccess,
    getUserInfoError,
} from '../../actions';
import {
    signIn,
    signOut,
    getInfoUser,
    updatePassword,
    updateProfile,
} from '../../networks';

export function* signInSaga(action) {
    try {
        let result = yield signIn(action.signinData);

        if (result.data) {
            yield put(signInSuccess(result.data));

            toast.success(result.data.message || 'Đăng nhập thành công.');
            setTimeout(() => {
                window.location.href = "/";
            }, 500);
        } else {
            toast.error('Đăng nhập thất bại, vui lòng thử lại.');
        }
    } catch (error) {
        toast.error(error.response && error.response.data && error.response.data.message ? error.response.data.message : 'Đăng nhập thất bại, vui lòng thử lại.');
    }
}

export function* signOutSaga(action) {
    try {
        let result = yield signOut(action.signoutData);

        if (result.data) {
            yield put(signOutSuccess(result.data));

            // Toast.success(result.data.message || 'Đăng nhập thành công.', 1, async () => {

                // navigatorRef.dispatch(NavigationActions.navigate({routeName: 'Home'}));
            // });
        } else {
            // Toast.fail('Đăng nhập thất bại, vui lòng thử lại.');
        }
    } catch (error) {
        // Toast.fail(error.response && error.response.data ? error.response.data : 'Đăng nhập thất bại, vui lòng thử lại.');
    }
}

export function* getInfoUserSaga(action) {
    try {
        let result = yield getInfoUser();

        if (result.data && result.data.data) {
            yield put(getUserInfoSuccess(result.data.data));
        } else {
            yield put(getUserInfoError());
        }
    } catch (error) {
        yield put(getUserInfoError());
    }
}

export function* updatePasswordSaga(action) {
    try {
        let result = yield updatePassword(action.passwordData);
        if (result.data) {
            // Toast.success(result.data);
        }
    } catch (error) {
        // Toast.fail(error && error.response && error.response.data ? error.response.data : 'Cập nhật mật khẩu thất bại, vui lòng thử lại.');
    }
}

export function* updateProfileSaga(action) {
    try {
        let result = yield updateProfile(action.profileData);
        if (result.data) {
            // Toast.success(result.data);
        }
    } catch (error) {
        // Toast.fail(error && error.response && error.response.data ? error.response.data : 'Cập nhật profile thất bại, vui lòng thử lại.');
    }
}
