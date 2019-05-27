import React, { Component } from 'react'
import PlanService from '../../Services/PlanService'
import PlanCard from './PlanCard'
import PlanForm from './PlanForm'
import Modal from 'react-modal'


const customStyles = {
    overlay: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0)'
    },  
    content: {
        top: '77%',
        left: '72%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '40%',
        height: '23%',
        border: '0px',
        padding: '1rem',
        color: 'white',
        backgroundColor: '#FF4E50',
        borderRadius: '0px'
        }
}

Modal.setAppElement('#root')


class PlansList extends Component {

    constructor(props) {
        super(props)

        this.state = {
            modalIsOpen: false,
            plans: [],
            loggedInUser: null,
            loading: true
        }

        this.services = new PlanService()
        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
    }

    getAllPlans = () => {
        return this.services.getAllPlans()
            .then(data => {
                this.setState({
                    plans: data,
                    loading: false
                })
            })
    }

    filterByCategory = (value, e) => {
        e.target.className+='-active'
        e.target.disabled='disable'

        let plansCopy = [...this.state.plans]
        let filtered = plansCopy.filter(plan => plan.categories.includes(value))

        this.setState({
            plans: filtered
    })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ ...this.state, loggedInUser: nextProps["userInSession"] })
    }

    componentDidMount() {
        this.getAllPlans()
    }

    sortByLikesUp = () => {    
            let plansCopy = [...this.state.plans]

            let sorted = plansCopy.sort(function(a,b){
                let first = a.likes
                let second = b.likes
                if (first < second) return 1;
                else if (first > second) return -1;
                return 0;
            })
            this.setState({
                plans: sorted
        })
    }

    sortByLikesDown = () => {    
        let plansCopy = [...this.state.plans]

        let sorted = plansCopy.sort(function(a,b){
            let first = a.likes
            let second = b.likes
            if (first < second) return -1;
            else if (first > second) return 1;
            return 0;
        })
        this.setState({
            plans: sorted
    })
}

    sortByPriceUp = () => {    
            let plansCopy = [...this.state.plans]

            let sorted = plansCopy.sort(function(a,b){
                let first = a.maxPrice
                let second = b.maxPrice
                if (first < second) return 1;
                else if (first > second) return -1;
                return 0;
            })
            this.setState({
                plans: sorted
        })
    }

    sortByPriceDown = () => {    
        let plansCopy = [...this.state.plans]

        let sorted = plansCopy.sort(function(a,b){
            let first = a.maxPrice
            let second = b.maxPrice
            if (first < second) return -1;
            else if (first > second) return 1;
            return 0;
        })
        this.setState({
            plans: sorted
    })
}

    sortByPlanDurationUp = () => {    
            let plansCopy = [...this.state.plans]

            let sorted = plansCopy.sort(function(a,b){
                let first = a.planDuration
                let second = b.planDuration
                if (first < second) return 1;
                else if (first > second) return -1;
                return 0;
            })
            this.setState({
                plans: sorted
        })
    }

    sortByPlanDurationDown = () => {    
        let plansCopy = [...this.state.plans]

        let sorted = plansCopy.sort(function(a,b){
            let first = a.planDuration
            let second = b.planDuration
            if (first < second) return -1;
            else if (first > second) return 1;
            return 0;
        })
        this.setState({
            plans: sorted
    })
}

    sortByPeopleUp = () => {    
        let plansCopy = [...this.state.plans]

        let sorted = plansCopy.sort(function(a,b){
            let first = a.planDuration
            let second = b.planDuration
            if (first < second) return 1;
            else if (first > second) return -1;
            return 0;
        })
        this.setState({
            plans: sorted
    })
    }

    sortByPeopleDown = () => {    
        let plansCopy = [...this.state.plans]

        let sorted = plansCopy.sort(function(a,b){
            let first = a.planDuration
            let second = b.planDuration
            if (first < second) return -1;
            else if (first > second) return 1;
            return 0;
        })
        this.setState({
            plans: sorted
    })
    }

    openModal = () => {
        this.setState({ modalIsOpen: true })
    }

    closeModal = () => {
        this.setState({ modalIsOpen: false })
    }

    render() {
        if (this.state.loggedInUser) {
            if (this.state.loading){
                return(
                    <div className="spinner"></div> 
                )
            }
            else{
            return (
                <div className="container">
                    <div className="filters-container">
                        <button className="nav-element-beer" onClick={e => this.filterByCategory("drinks", e)}></button>
                        <button className="nav-element-leaf" onClick={(e) => this.filterByCategory("nature", e)}></button>
                        <button className="nav-element-disco" onClick={(e) => this.filterByCategory("party", e)}></button>
                        <button className="nav-element-pets" onClick={(e) => this.filterByCategory("pets", e)}></button>
                        <button className="nav-element-football" onClick={(e) => this.filterByCategory("sports", e)}></button>
                        <button className="nav-element-shopping" onClick={(e) => this.filterByCategory("shopping", e)}></button>
                        <button className="nav-element-tray" onClick={(e) => this.filterByCategory("food", e)}></button>
                        <button className="nav-element-romantic" onClick={(e) => this.filterByCategory("romantic", e)}></button>
                    </div>
                    <PlanForm getAllPlans={this.getAllPlans} userInSession={this.state.loggedInUser} setUser={this.setTheUser} />
                    <div className="plan-list">
                        {
                            this.state.plans.map(plan => <PlanCard key={plan._id} {...plan} loggedInUser={this.state.loggedInUser} refreshPlans={this.getAllPlans}/>)
                        }
                    </div>
                    <div>
                            <button onClick={this.openModal} className="open-sort-menu"></button>
                            <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal} style={customStyles}>
                            <p>Sort By:</p>
                            <div className="sort-options-container">
                                <div className="each-option-container">
                                    <p>Likes</p>
                                    <div className="sort-buttons-container">
                                        <button onClick={this.sortByLikesUp} className="sort-button-up"></button>
                                        <button onClick={this.sortByLikesDown} className="sort-button-down"></button>
                                    </div>
                                </div>
                                <div className="each-option-container">
                                    <p>Price</p>
                                    <div className="sort-buttons-container">
                                        <button onClick={this.sortByPriceUp} className="sort-button-up"></button>
                                        <button onClick={this.sortByPriceDown} className="sort-button-down"></button>
                                    </div>
                                </div>
                                <div className="each-option-container">
                                    <p>Duration</p>
                                    <div className="sort-buttons-container">
                                        <button onClick={this.sortByPlanDurationUp} className="sort-button-up"></button>
                                        <button onClick={this.sortByPlanDurationDown} className="sort-button-down"></button>
                                    </div>
                                </div>
                                <div className="each-option-container">
                                    <p>People</p>
                                    <div className="sort-buttons-container">
                                        <button onClick={this.sortByPeopleUp} className="sort-button-up"></button>
                                        <button onClick={this.sortByPeopleDown} className="sort-button-down"></button>
                                    </div>
                                </div>
                            </div>
                            </Modal>
                        </div>
                </div>
            )
            }
        }else{
            if (this.state.loading){
                return(
                    <div className="spinner"></div> 
                )
            }
            else{
            return (
                <div className="container">    
                    <div className="filters-container">
                        <button className="nav-element-beer" onClick={(e) => this.filterByCategory("drinks", e)}></button>
                        <button className="nav-element-leaf" onClick={(e) => this.filterByCategory("nature", e)}></button>
                        <button className="nav-element-disco" onClick={(e) => this.filterByCategory("party", e)}></button>
                        <button className="nav-element-pets" onClick={(e) => this.filterByCategory("pets", e)}></button>
                        <button className="nav-element-football" onClick={(e) => this.filterByCategory("sports", e)}></button>
                        <button className="nav-element-shopping" onClick={(e) => this.filterByCategory("shopping", e)}></button>
                        <button className="nav-element-tray" onClick={(e) => this.filterByCategory("food", e)}></button>
                        <button className="nav-element-romantic" onClick={(e) => this.filterByCategory("romantic", e)}></button>
                    </div>
                    <div className="plan-list">
                        {
                            this.state.plans.map(plan => <PlanCard key={plan._id} {...plan} refreshPlans={this.getAllPlans}/>)
                        }
                    </div>
                    <div>
                        <button onClick={this.openModal} className="open-sort-menu"></button>
                        <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal} style={customStyles}>
                        <p>Sort By:</p>
                        <div className="sort-options-container">
                            <div className="each-option-container">
                                <p>Likes</p>
                                <div className="sort-buttons-container">
                                    <button onClick={this.sortByLikesUp} className="sort-button-up"></button>
                                    <button onClick={this.sortByLikesDown} className="sort-button-down"></button>
                                </div>
                            </div>
                            <div className="each-option-container">
                                <p>Price</p>
                                <div className="sort-buttons-container">
                                    <button onClick={this.sortByPriceUp} className="sort-button-up"></button>
                                    <button onClick={this.sortByPriceDown} className="sort-button-down"></button>
                                </div>
                            </div>
                            <div className="each-option-container">
                                <p>Duration</p>
                                <div className="sort-buttons-container">
                                    <button onClick={this.sortByPlanDurationUp} className="sort-button-up"></button>
                                    <button onClick={this.sortByPlanDurationDown} className="sort-button-down"></button>
                                </div>
                            </div>
                            <div className="each-option-container">
                                <p>People</p>
                                <div className="sort-buttons-container">
                                    <button onClick={this.sortByPeopleUp} className="sort-button-up"></button>
                                    <button onClick={this.sortByPeopleDown} className="sort-button-down"></button>
                                </div>
                            </div>
                        </div>
                        </Modal>
                    </div>

                </div>
            )
            }
        }
    }
}

export default PlansList