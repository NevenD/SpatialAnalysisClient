import axios from "axios";
const baseDomain = process.env.VUE_APP_URL;
// The base URL is empty this time due we are using the jsonplaceholder API
const baseURL = `${baseDomain}`;


export default axios.create({
    baseURL
});