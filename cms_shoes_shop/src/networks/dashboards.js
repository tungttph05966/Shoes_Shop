import { axios } from './index.js';

const DASHBOARDS_URL = '/dashboards'

export function getDashboardInfos () {
    return axios.get(
        `${DASHBOARDS_URL}`,
    );
}