import axios from "axios";

const API = axios.create({

    baseURL:
    "http://10.73.53.200:5000/api",

    withCredentials:true
});

export default API;