import React, { Component } from 'react'
import PlanService from '../../Services/PlanService'
import LocationCard from './LocationCard'
import InstaStories from './InstaStories'
import Modal from 'react-modal'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        height: '80%',
        padding: '0px',
        border: 'none'
    }
}

Modal.setAppElement('#root')

class PlanDetails extends Component {

    constructor(props) {
        super(props)

        this.state = { 
            modalIsOpen: false,
            plan: {
                locations: []
            },
            locationsDetailed : []
            
        }
        this.service = new PlanService()
        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
    
        this.service.getOnePlan(this.props.match.params.id)
            .then(response => this.setState({ plan: response }))
    }

    openModal = () => {
        this.setState({ modalIsOpen: true })
    }

    closeModal = () => {
        this.setState({ modalIsOpen: false })
    }

    getLocationDetails = () =>{
        this.state.plan.locations.forEach(locationId => {
            this.service.getLocations(locationId)
            .then(response => {
                let arrayCopy = this.state.locationsDetailed
                arrayCopy.push(response)
                this.setState({ locationsDetailed: arrayCopy })
            })
        })
    }

    componentDidMount(){
        setTimeout(
            function() {
                this.getLocationDetails()
            }
            .bind(this),
        300
        )
    }

    render() {    
        return (
            <div className="plan-details-container">
                <h2 className="title-in-details">{this.state.plan.title}</h2>
                <div>
                    <div>
                        <button className="instastory-on-details pulse" onClick={this.openModal}></button>
                        <div className="instacontainer">
                            <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal} style={customStyles}>
                                <InstaStories images={this.state.plan.imagesUrls}/>
                            </Modal>
                        </div> 
                        <div className="description-on-details">
                            <p>{this.state.plan.description}</p>
                        </div>
                        <h4>Locations</h4>
                        <div className="locations-list-on-details">
                            {
                                this.state.locationsDetailed.map(location => <LocationCard key={location.data._id} {...location.data} />)
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PlanDetails