import axios from 'axios'
const apiClient = axios.create({
    baseURL: 'https://653062896c756603295e947b.mockapi.io/api/books',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default {
    async loadData() {
        try {
            
            const response = await apiClient.get('/');

            return response.data
        } catch (error) {
            throw "Error de conexion"
        }
    },
    async saveData(elem) {
        try {
            
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
}
