import axios from "axios";

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWU2OWYzNWQwNzAxODczZGU5NjQyNTMiLCJhY2NvdW50VHlwZSI6ImFkbWluIiwiaWF0IjoxNzEwNDk3MzkxNjI5LCJleHAiOjE3MTA1ODM3OTE2Mjl9.J4uo2Hisnikunrjzzj6WoH7liQLwG79Qc6wKp6UQkzo";
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