import axios from 'axios'
const apiClient = axios.create({
    baseURL: 'https://653062896c756603295e947b.mockapi.io/api/books',
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
    async saveData(elem) {
        try {
            elem.avalaible_quantity = parseInt(elem.avalaible_quantity)
            await apiClient.post('/', elem);
        } catch (error) {
            throw "Error de conexion"
        }
    },
    async deleteBook(id) {
        try {
            await apiClient.delete("/"+id)
        } catch (error) {
            throw "Error de conexion"
        }
    },
    async updateBook(id, elem) {
        try {
            console.log(id, elem)
            const numId = parseInt(id)
            return await apiClient.put("/"+numId, elem)
        } catch (error) {
            throw "Error de conexion"
        }
    },

    async getBookById(id) {
        try {
            
            const response = await apiClient.get('/'+id);
            console.log(response)
            return response.data
        } catch (error) {
            throw "Error de conexion"
        }
    },
    async updateBookAvailability(id) {
        try {
            
            const response = await apiClient.get('/'+id);
            response.data.avalaible_quantity = response.data.avalaible_quantity -1
            
            this.updateBook(id, response.data)

        } catch (error) {
            throw "Error de conexion"
        }
    },
}
