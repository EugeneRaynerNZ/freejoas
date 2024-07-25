import Axios from '../axios'

class ApiService{
    static async fetchFreejoasData(){
        const response = await Axios.get('/freejoa/all');

        return response;
    }

    static async login(email, password){
        const response = await Axios.post('/user/login', {
            email: email,
            password: password,
        });

        return response;
    }
}

export default ApiService;