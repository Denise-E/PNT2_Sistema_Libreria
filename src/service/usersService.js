import axios from 'axios'
const apiClient = axios.create({
    baseURL: 'https://653062896c756603295e947b.mockapi.io/api/users',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default {
    async loadData(id) {
        let response = ''
        try {
            
            if(id){
                response = await apiClient.get('/'+id);
            }else{
                response = await apiClient.get('/');
            }
            return response.data
        } catch (error) {
            throw "Error de conexion"
        }
    },
    async saveData(user) {
        try {

            if(user.email.includes('@libreria.com.ar')){
                user.admin = true;
            }
            
            await apiClient.post('/', user);
        } catch (error) {
            throw "Error de conexion"
        }
    },

    async login(user){
        let userfound = undefined;
        
        const users = await apiClient.get('/');

        const user_by_email = users.data.find(u => user.email == u.email)

        if(user_by_email){ // Sino undefined ?
            if(user_by_email.password == user.password){
                userfound = user_by_email;
            }
        }

        return userfound;
    },

    async deleteUser(id) {
        try {
            await apiClient.delete("/"+id)
        } catch (error) {
            throw "Error de conexion"
        }
    },
    async updateUser(elem) { 
        let updated = false;
        try {
           
            const numId = parseInt(elem.id)
            await apiClient.put("/"+numId, elem)
            updated = true;

            return updated;

        } catch (error) {
            throw `Error de conexion ${error.message}`
        }
    },

    async getUserById (id){
        try{
            return await apiClient.get('/'+id);
        } catch (error) {
            throw `Error de conexion ${error.message}`
        }
        
    }
}
