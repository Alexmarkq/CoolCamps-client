import axios from 'axios'

class RentService {

    constructor() {

        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/coolCamps`
        })
    }

    getRents() {
        return this.api.get('/getAllRents')
    }

    getOneRent(rent_id) {
        return this.api.get(`/rent/${rent_id}`)
    }

    saveRent(rentData) {
        return this.api.post('/saveRent', rentData)
    }
}

const rentService = new RentService()

export default rentService