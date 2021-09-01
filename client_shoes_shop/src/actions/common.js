import {
    TOGGLE_LOADING,
    TOGGLE_SIDEBAR,
} from './actionTypes';

export const toggleLoading = (loading) => ({
    type: TOGGLE_LOADING,
    loading,
});

export const toggleSidebar = (sidebarShow) => ({
    type: TOGGLE_SIDEBAR,
    sidebarShow,
});