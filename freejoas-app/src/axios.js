import axios from "axios";

// this is the backend ngrok URL (this will change)
const instance = axios.create({
    baseURL: "http://localhost:4000/api/v1",
    // baseURL: "https://freejoas.azurewebsites.net/api/v1",
    headers: {
        'Content-Type': 'application/json',
        // 'ngrok-skip-browser-warning' :'skip-browser-warning'
    }
})

export default instance;