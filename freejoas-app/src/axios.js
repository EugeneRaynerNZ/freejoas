import axios from "axios";

const instance = axios.create({
    // baseURL: "http://localhost:4000/api",
    baseURL: "https://b14b-121-98-11-51.ngrok-free.app/api",
})

export default instance;