import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Modal from 'react-modal'
import PlanService from '../../Services/PlanService'
import InstaStories from './InstaStories';

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

let likedPlan = false

Modal.setAppElement('#root')

class PlanCard extends Component {
    constructor(props) {
        super(props)

        this.state = { 
            modalIsOpen: false
        }
        this.service = new PlanService()
        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
    }

    openModal = () => {
        this.setState({ modalIsOpen: true })
    }

    closeModal = () => {
        this.setState({ modalIsOpen: false })
    }

    increaseLikes = planId => {
        if (this.props.loggedInUser) {

        return this.service.increaseLikes(planId)
            .then(data => {
                this.props.loggedInUser.likedPlans.push(data._id)
                this.props.refreshPlans()
                this.service.setLikeInUser(data._id, this.props.loggedInUser._id)
            })
        }else{
            console.log("can't like because not logged in")
        }
    }

    render(){
        if (this.props.loggedInUser) {
            if(this.props.loggedInUser.likedPlans.includes(this.props._id)) likedPlan = true
            else likedPlan = false
            
            return (
                <div className="plan-card">
                    <div className="main-title-container">
                        <Link to={`/planazo-front/plans/${this.props._id}`}><p className="plan-title">{this.props.title}</p></Link>
                    </div>

                    <div className="plan-image-container">
                        <Link to={`/planazo-front/plans/${this.props._id}`}><img className="plan-image-in-list" src={this.props.imagesUrls[0]} alt={this.props.title}/></Link>
                    </div>

                    <div className="plan-footer">
                        
                        {likedPlan === false &&
                        <React.Fragment>
                            <button className="empty-heart" onClick={(e) => this.increaseLikes(this.props._id)}></button>
                            
                            <div className="plan-info-container">
                                <p className="likes-counter">{`${this.props.likes} likes `}</p>
                                <p className="likes-counter">{`${this.props.maxPrice} € `}</p>
                                <p className="likes-counter">{`${this.props.minPeople} people`}</p>
                            </div>

                            <button className="instastory" onClick={this.openModal}></button>
                            <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal} style={customStyles}>
                                <InstaStories images={this.props.imagesUrls}/>
                            </Modal>
                        </React.Fragment>
                        }
                        {likedPlan === true &&
                        <React.Fragment>
                            <button disabled="disable" className="heart" onClick={(e) => this.increaseLikes(this.props._id)}></button>
                            
                            <div className="plan-info-container">
                                <p className="likes-counter">{`${this.props.likes} likes `}</p>
                                <p className="likes-counter">{`${this.props.maxPrice} € `}</p>
                                <p className="likes-counter">{`${this.props.minPeople} people`}</p>
                            
                            </div>
                            <button className="instastory" onClick={this.openModal}></button>
                            <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal} style={customStyles}>
                                <InstaStories images={this.props.imagesUrls}/>
                            </Modal>
                        </React.Fragment>
                        }
                    </div>
                </div>
            )
        } else{
            return (
                <div className="plan-card">
                    <div className="main-title-container">
                        <Link to={`/planazo-front/plans/${this.props._id}`}>
                            <p className="plan-title">{this.props.title}</p>
                        </Link> 
                    </div>

                    <div className="plan-image-container">
                        <Link to={`/planazo-front/plans/${this.props._id}`}><img className="plan-image-in-list" src={this.props.imagesUrls[0]} alt={this.props.title}/></Link>
                    </div>

                    <div className="plan-footer">
                        
                        <Link to={`/planazo-front/login`}><button className="empty-heart" onClick={(e) => this.increaseLikes(this.props._id)}></button></Link>
                        
                        <div className="plan-info-container">
                            <p className="likes-counter">{`${this.props.likes} likes `}</p>
                            <p className="likes-counter">{`${this.props.maxPrice} € `}</p>
                            <p className="likes-counter">{`${this.props.minPeople} people `}</p>
                        </div>
                        
                        <button className="instastory" onClick={this.openModal}></button>
                        <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal} style={customStyles}>
                            <InstaStories images={this.props.imagesUrls}/>
                        </Modal>
                    </div>
                </div>
            )
        }
    }
}

export default PlanCard