import axios from 'axios';

// Set base url
axios.defaults.baseURL = 'https://smart-work-api.onrender.com/';
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
axios.defaults.withCredentials = true;

// Export
export const axiosReq = axios.create();
export const axiosRes = axios.create();
