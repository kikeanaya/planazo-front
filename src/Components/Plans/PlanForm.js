import React, { Component } from 'react'
import PlanService from '../../Services/PlanService'
import Modal from 'react-modal'
import LocationSearch from '../Plans/LocationSearch'
import ImagesUpload from './ImagesUpload'
import Checkbox from './Checkbox'

const OPTIONS = ["romantic", "party", "nature", "food", "drinks", "sports", "shopping", "pets"];

const customStyles = {
    overlay: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.75)'
    },  
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        height: '70%',
        border: '0px',
        padding: '1rem',
        color: 'black',
        borderWidth: '2px',
        borderStyle: 'solid',
        borderImage: 'linear-gradient(to bottom, red, rgba(0, 0, 0, 0)) 1 100%'
        
        }
}

Modal.setAppElement('#root')

class PlanForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            modalIsOpen: false,
            formNumber: 0,

            checkboxes: OPTIONS.reduce(
                (options, option) => ({
                  ...options,
                  [option]: false
                }),
                {}
            ),
            plan: {
                planCreator: this.props.userInSession._id,
                title: '',
                description: '',
                locations: [],
                categories: [],
                maxPrice: 0,
                minPeople: 0,
                imagesUrls: []
            }
        }

        this.services = new PlanService()
        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
    }

    handleCheckboxChange = changeEvent => {
        const { name } = changeEvent.target;
    
        this.setState(prevState => ({
          checkboxes: {
            ...prevState.checkboxes,
            [name]: !prevState.checkboxes[name]
          }
    }))
    }

    createCheckbox = option => (
        <Checkbox
          label={option}
          isSelected={this.state.checkboxes[option]}
          onCheckboxChange={this.handleCheckboxChange}
          key={option}
          value={option}
        />
    )

    createCheckboxes = () => OPTIONS.map(this.createCheckbox)

    handleCategoriesSubmit = e => {
        e.preventDefault()
      
        Object.keys(this.state.checkboxes)
          .filter(checkbox => this.state.checkboxes[checkbox])
          .forEach(checkbox => {
              const catCopy = this.state.plan.categories
              catCopy.push(checkbox)
              this.setState({
                plan: {
                    ...this.state.plan, categories: catCopy
                }
            })
          })
    }

    openModal = () => {
        this.setState({ modalIsOpen: true })
    }

    closeModal = () => {
        this.setState({ modalIsOpen: false })
    }

    handleState = e => {
        const { name, value } = e.target

        this.setState({
            plan: {
                ...this.state.plan, [name]: value
            }
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        this.services.postNewPlan(this.state.plan)
            .then(x => this.props.getAllPlans())
        
        this.setState({
            formNumber: 0,
            plan: {
                title: '',
                description: '',
                locations: [],
                categories: [],
                maxPrice: 0,
                minPeople: 0,
                imagesUrls: []
            }
        })
        this.closeModal()
    }

    handleNextStep = e =>{
        this.setState({
            formNumber: this.state.formNumber + 1
        })
    }

    handlePreviousStep = e =>{
        this.setState({
            formNumber: this.state.formNumber - 1
        })
    }

    handleSelectedLocations =(selected) =>{
        selected.forEach(element => {
            this.services.postNewLocation(element)
            .then(response =>{
                let locationsCopy = this.state.plan.locations
                locationsCopy.push(response)
                this.setState({
                    plan: {
                        ...this.state.plan, locations: locationsCopy
                    }
                })
            })
        })
    }

    setImageUrls = (data) =>{
        this.setState({
            plan: {
                ...this.state.plan, imagesUrls: data
            }
        })
        
    }

    render() {
        return (
            <div>
                <button onClick={this.openModal} className="new-plan-button"></button>
                <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal} style={customStyles}>

                    <p className="create-plan-title">CREATING A  PLAN...</p>
                    <form className="form-container-create"onSubmit={(e) => this.handleSubmit(e)}>

                    {this.state.formNumber === 0 &&  
                    <React.Fragment>
                        <div >
                            <label className="create-plan-entries">Plan Title</label>
                            <input className="create-plan-inputs" type="text"  name="title" value={this.state.plan.title} onChange={(e) => this.handleState(e)} />
                        </div>

                        <div >
                            <label className="create-plan-entries">Description</label>
                            <input className="create-plan-inputs" type="text"  name="description" value={this.state.plan.description} onChange={(e) => this.handleState(e)} />
                        </div>
                        <div >
                        <label className="create-plan-entries">Max Price</label>
                            <select name="maxPrice"  className="create-plan-inputs" defaultValue="0" onChange={(e) => this.handleState(e)} >
                                <option value={0}>0€</option>
                                <option value={10}>10€</option>
                                <option value={30}>30€</option>
                                <option value={50}>50€</option>
                                <option value={70}>70€</option>
                                <option value={100}>100€</option>
                                <option value={300}>300€</option>
                                <option value={500}>500€</option>
                                <option value={700}>700€</option>
                                <option value={1000}>1000€</option>
                                <option value={2000}>2000€</option>
                                <option value={5000}>5000€</option>
                            </select>
                        </div>
                        <div>
                        <label className="create-plan-entries">Min People</label>
                            <select name="minPeople" className="create-plan-inputs"  defaultValue="1" onChange={(e) => this.handleState(e)} >
                                <option value={1}>1 persona</option>
                                <option value={2}>2 personas</option>
                                <option value={4}>4 personas</option>
                                <option value={8}>8 personas</option>
                                <option value={20}>20 personas</option>
                                <option value={100}>100 personas</option>
                            </select>
                        </div>
                        <button className="next-step" onClick={(e)=>this.handleNextStep(e)}></button>
                    </React.Fragment>
                    }
                    {this.state.formNumber === 1 &&  
                    <React.Fragment>
                        <LocationSearch handleSelectedLocations={this.handleSelectedLocations}/>
                        <button className="previous-step" onClick={(e)=>this.handlePreviousStep(e)}></button>
                        <button className="next-step" onClick={(e)=>this.handleNextStep(e)}></button>
                    </React.Fragment>
                    }
                    {this.state.formNumber === 2 &&  
                    <React.Fragment>
                        <ImagesUpload setImageUrls={this.setImageUrls}/>
                        <button className="previous-step" onClick={(e)=>this.handlePreviousStep(e)}></button>
                        <button className="next-step" onClick={(e)=>this.handleNextStep(e)}></button>
                    </React.Fragment>
                    }
                    {this.state.formNumber === 3 &&  
                    <React.Fragment>
                        <form className="checkbox-list" onSubmit={this.handleFormSubmit}>
                            {this.createCheckboxes()}
                        </form>
                        <button className="previous-step" onClick={(e)=>this.handlePreviousStep(e)}></button>
                        <div className="final-buttons-container">
                            <button  className="confirm-locations-button" type="button" onClick={(e)=>this.handleCategoriesSubmit(e)}>
                                Confirm
                            </button>    
                            <button className="create-plan-button-form" type="submit">Create Plan</button>
                        </div>
                    </React.Fragment>
                    }
                    </form>
                </Modal>
            </div>
        )
    }
}

export default PlanForm