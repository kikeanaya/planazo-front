import React, { Component } from 'react'
import PlanService from '../../Services/PlanService'

class PlaceCard extends Component{
    
    constructor(props) {
        super(props)

        this.state = { 
            place: props,
            name : '',
            address: '',
            photo: '',
            rating: 0,
            website: '',
            price_level: 0
        }
        this.service = new PlanService()
    }

    getPlaceInfo = () => {
        this.service.getPlaceInfo(this.state.place.place_id)
        .then(placeInfo => {
            this.service.getPlacePhoto(placeInfo.result.photos[0].photo_reference)
            .then(photo =>{
                console.log(photo)
                this.setState({
                    name : placeInfo.result.name,
                    photo: photo,
                    address: placeInfo.result.formatted_address,
                    rating: placeInfo.result.rating,
                    website: placeInfo.result.website,
                    price_level: placeInfo.result.price_level
                })
            })  
        })
    }

    componentDidMount() {
        this.getPlaceInfo()
    }

render(){
    return (
        <div className="each-result">
            <div className="each-result-info">
                <p>{this.state.name}</p>
                <p>{this.state.address}</p>
                <p>Rating: {this.state.rating}</p>
            </div>
            <button className="pick-location-button" onClick = {e=>this.props.handleLocationSelect(e, {...this.state})}>Select</button>
        </div>
        )
    }
}

export default PlaceCard