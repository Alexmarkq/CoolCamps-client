import axios from 'axios'

class ReviewService {

    constructor() {
        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/review`
        })
        this.api.interceptors.request.use((config) => {
            const storedToken = localStorage.getItem("authToken");
            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }
            return config
        })
    }

    saveReview(review_id, reviewInfo) {
        return this.api.post(`/create/${review_id}`, reviewInfo)
    }

    showReview(review_id) {
        return this.api.get(`/showreviews/${review_id}`)
    }

    deleteReview(review_id) {
        return this.api.delete(`/deleteReview/${review_id}`)
    }
}

const reviewService = new ReviewService()

export default reviewService