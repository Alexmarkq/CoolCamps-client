import axios from 'axios'

class RentService {
  constructor() {
    this.api = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/coolCamps`,
    })
    this.api.interceptors.request.use((config) => {
      const storedToken = localStorage.getItem('authToken')
      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` }
      }
      return config
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

  getOwnRents() {
    return this.api.get('/getOwnRents')
  }

  getUserRents() {
    return this.api.get('/getUserRents')
  }

  editRent(rentData, rent_id) {
    return this.api.put(`/rent/edit/${rent_id}`, rentData)
  }

  likeRent(rent_id) {
    return this.api.post(`/likeRent/${rent_id}`)
  }

  unlikeRent(rent_id) {
    return this.api.post(`/unlikeRent/${rent_id}`)
  }

  getLikedRent() {
    return this.api.get('/getLikedRent')
  }

  deleteRent(rent_id) {
    return this.api.delete(`/deleteRent/${rent_id}`)
  }

  enable(rent_id) {
    return this.api.post(`/enable/${rent_id}`)
  }

  disable(rent_id) {
    return this.api.post(`/disable/${rent_id}`)
  }
}

const rentService = new RentService()

export default rentService
