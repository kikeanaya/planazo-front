import React, { Component } from 'react'
import PlanService from '../../Services/PlanService'
import PlaceCard from './PlaceCard'
import PickedCard from './PickedCard'

class LocationSearch extends Component {

    constructor(props) {
        super(props)

        this.state = {
            search: '',
            results: [],
            selected: []
        }
        this.services = new PlanService()
    }

    handleState = e => {
        const {value} = e.target

        this.setState({
            search: value
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        this.services.getSearchResults(this.state.search)
            .then(placesArray => {
                this.setState({
                    results: placesArray
                })
            })
        this.setState({
            search: ''
        })
    }
    
    handleLocationSelect = (e, place) =>{
        e.preventDefault()
        const {name, address, rating, website, photo, price_level} = place
        let pending = {name, address, rating, website, photo, price_level}

        let arrayCopy = this.state.selected

        arrayCopy.push(pending)
        
        this.setState({
            selected: arrayCopy
        })
    }

    render() {
        return (
            <div className="main-search-wrapper">
                
                <h3>Search for a Location</h3>

                <div className="location-search">
                    <input className="create-plan-inputs" type="text" name="search" autoComplete="off" value={this.state.search} onChange={(e) => this.handleState(e)}/>
                    <button className="create-plan-button-form" type="button" onClick= {e => this.handleSubmit(e)}>Search</button>
                </div>  
                <div className="location-results">
                {
                    this.state.results.map(place => <PlaceCard key={place.id} {...place} handleLocationSelect={this.handleLocationSelect}/>)
                }
                </div>
                <div className="picked-container">
                    <h3>Picked Locations</h3>
                    {   
                        this.state.selected.map((place,idx)=> <PickedCard key={idx} {...place}/>)
                    }
                </div>
                <button type="button" className="confirm-locations-button" onClick= {()=> this.props.handleSelectedLocations(this.state.selected)}>Confirm Locations</button>

            </div>
        )
    }
}

export default LocationSearch