import { axios } from './index.js';

const UPLOAD_URL = '/upload'

export function uploadFile(files) {
    return axios.post(
        `${UPLOAD_URL}`,
        files,
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        },
    );
}