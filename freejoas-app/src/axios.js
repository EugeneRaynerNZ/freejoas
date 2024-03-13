import axios from "axios";

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWU2OWYzNWQwNzAxODczZGU5NjQyNTMiLCJhY2NvdW50VHlwZSI6ImFkbWluIiwiaWF0IjoxNzEwMzI5MTAwNDIwLCJleHAiOjE3MTA0MTU1MDA0MjB9.D9IPHRh7Zalmqfq34-SXjzBifkXHgUzphYNyf0t5t80";

// this is the backend ngrok URL (this will change)
const instance = axios.create({
    baseURL: "http://localhost:4000/api/v1",
    // baseURL: "https://freejoas.azurewebsites.net/api/v1",
    headers: {
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + token,
        // 'ngrok-skip-browser-warning' :'skip-browser-warning'
    }
})

export default instance;