import axios from 'axios'

class ReviewService {

    constructor() {

        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/coolCamps`
        })
        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })
    }

    saveReview(rent_id) {
        return this.api.post(`/create/${rent_id}`)
    }
}

const reviewService = new ReviewService()

export default reviewService