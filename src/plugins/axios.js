import axios from "axios";
let baseURL = `http://localhost:3000`;
let apiKey = process.env.VUE_APP_APIKEY;

const instance = axios.create({
    baseURL: baseURL,
    timeout: 30000,
    headers: {
        "X-Api-Key": apiKey,
    },
});

export default instance;