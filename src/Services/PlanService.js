import axios from "axios";

export default class services {

    constructor() {

        this.service = axios.create({
            baseURL: 'https://planazo.herokuapp.com/api/',
            withCredentials: true
        })
    }

    getAllPlans = () => {
        const promise = this.service.get("getAllPlans", { withCredentials: true })
            .then(res => {
                return res.data
            })
            .catch(err => {
                console.log(err)
            })
        return promise;
    }

    postNewPlan = plan => {
        const promise = this.service.post("postNewPlan", plan, { withCredentials: true })
            .then(res => {
                return res.data;
            })
            .catch(err => {
                console.log(err)
            })
        return promise;
    }

    getOnePlan = idPlan => {
        const promise = this.service.get(`getOnePlan/${idPlan}`, { withCredentials: true })
            .then(res => {
                return res.data;
            })
            .catch(err => {
                console.log(err)
            })
        return promise;
    }

    postNewLocation = (element) => {
        const promise = this.service.post("postNewLocation", element , { withCredentials: true })
            .then(res => {
                return res.data
            })
            .catch(err => console.log(err))
        return promise;
    }

    getSearchResults = search => {
        const promise = this.service.post(`getSearchResults`, {search}, { withCredentials: true })
            .then(res => {
                return res.data;
            })
            .catch(err => console.log(err))
        return promise;
    }

    getPlaceInfo = place_id => {
        const promise = this.service.post(`getPlaceInfo`, {place_id}, { withCredentials: true })
            .then(res => {
                return res.data;
            })
            .catch(err => console.log(err))
        return promise;
    }

    getPlacePhoto = ref => {
        const promise = this.service.post(`getPlacePhoto`, {ref}, { withCredentials: true })
            .then(res => {
                return res.data;
            })
            .catch(err => console.log(err))
        return promise;
    }

    getLocations = locationId => {
        const promise = this.service.get(`getLocations/${locationId}`, { withCredentials: true })
            .then(res => {
                return res
            })
            .catch(err => {
                console.log(err)
            })
        return promise;
    }

    handleUpload (theFile) {
        return this.service.post('/upload', theFile)
          .then(res => res.data.secure_urls)
          .catch(err=> console.log(err))
    }

    getUser= userId => {
        const promise = this.service.post(`getUser`, {userId}, { withCredentials: true })
            .then(res => {
                return res.data;
            })
            .catch(err => console.log(err))
        return promise;
    }

    increaseLikes = planId => {
        const promise = this.service.post(`increaseLikes`, {planId}, { withCredentials: true })
            .then(res => {
                return res.data
            })
            .catch(err => console.log(err))
        return promise;
    }

    setLikeInUser = (planId, userId) =>{
        const promise = this.service.post(`setLikeInUser`, {planId, userId}, { withCredentials: true })
            .then(res => {
                return res.data
            })
            .catch(err => console.log(err))
        return promise;
    }
}