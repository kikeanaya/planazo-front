import React, { Component } from 'react'
import PlanService from '../../Services/PlanService'

class PickedCard extends Component{
    
    constructor(props) {
        super(props)

        this.state = { 
            picked: props
        }
        this.service = new PlanService()
    }

render(){
    return (
        <div className="picked-location">
            <p>{this.state.picked.name}</p>
            <p>{this.state.picked.address}</p>
        </div>
        )
    }
}

export default PickedCard