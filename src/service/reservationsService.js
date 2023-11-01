import axios from 'axios'
const apiClient = axios.create({
    baseURL: 'https://65272ff5917d673fd76d7cfd.mockapi.io/api/reservations',
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
    async deleteReservation(id) {
        try {
            await apiClient.delete("/"+id)
        } catch (error) {
            throw "Error de conexion"
        }
    },
    async updateReservation(elem) {
        try {
            //console.log(id, elem)
            const numId = parseInt(elem.id)
            return await apiClient.put("/"+numId, elem)
        } catch (error) {
            throw "Error de conexion"
        }
    },
}
