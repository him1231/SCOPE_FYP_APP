import {action} from 'typesafe-actions';

export const SHOW_LOADING = 'SHOW_LOADING';
export const HIDE_LOADING = 'HIDE_LOADING';

export const showLoading = () => action(SHOW_LOADING);
export const hideLoading = () => action(HIDE_LOADING);
