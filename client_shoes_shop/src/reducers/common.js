import _ from 'lodash';

import {
    TOGGLE_LOADING,
    TOGGLE_SIDEBAR,
} from '../actions/actionTypes';

const initialState = {
    loading: false,
    sidebarShow: 'responsive',
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_SIDEBAR:
            return {
                ...state,
                sidebarShow: action.sidebarShow,
            };
        case TOGGLE_LOADING:
            return {
                ...state,
                loading: action.loading,
            };
        default:
            return state;
    }
}

export default reducer;
