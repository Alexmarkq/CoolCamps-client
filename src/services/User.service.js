import axios from 'axios'

class UserService {
  constructor() {
    this.api = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/user`,
    })
    this.api.interceptors.request.use((config) => {
      const storedToken = localStorage.getItem('authToken')
      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` }
      }
      return config
    })
  }

  deleteUser(user_id) {
    return this.api.delete(`/delete/${user_id}`)
  }
  getUser(user_id) {
    return this.api.get(`/${user_id}`)
  }
}

const userService = new UserService()

export default userService
