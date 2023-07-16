import axios from "axios";

axios.defaults.baseURL = "https://smart-work-api-c3503744e915.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;