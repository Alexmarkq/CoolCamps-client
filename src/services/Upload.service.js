import axios from 'axios'

class UploadServices {

    constructor() {
        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/upload`
        })
    }

    uploadimage(imageForm) {
        return this.api.post('/image', imageForm)
    }
}

const uploadServices = new UploadServices()

export default uploadServices