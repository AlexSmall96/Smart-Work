import axios from 'axios';

axios.defaults.baseURL = 'https://moments-backend-be44d267c563.herokuapp.com/';
axios.defaults.headers.post['Contet-Type'] = 'multipart/form-data';
axios.defaults.withCredentials = true;