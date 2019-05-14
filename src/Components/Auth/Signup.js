import React, { Component } from 'react'
import AuthService from '../../Services/AuthService'
import { Link } from 'react-router-dom'

class Signup extends Component {
  constructor(props){
    super(props)
    this.state = { username: '', password: '' }
    this.service = new AuthService()
  }

  handleFormSubmit = (event) => {
    event.preventDefault()
    const username = this.state.username
    const password = this.state.password
  
    this.service.signup(username, password)
    .then( response => {
        this.setState({
            username: "", 
            password: ""
        })
        this.props.setUser(response)
        window.location.assign('/')
    })
    .catch( error => console.log(error) )
  }
  
  handleChange = (event) => {  
    const {name, value} = event.target
    this.setState({[name]: value})
  }
      
  render(){
    return(
      <div>
        <form onSubmit={this.handleFormSubmit} className="box">
          <input type="text" name="username" value={this.state.username} placeholder="username" autoComplete="off" onChange={ e => this.handleChange(e)}/>
          <input type="password" name="password" value={this.state.password} placeholder="password" onChange={ e => this.handleChange(e)} />
          
          <input type="submit" value="Signup" />
          <p className="redirect-auth">Already have an account? 
            <Link to={"/login"}> Login here.</Link>
          </p>
        </form>
      </div>
    )
  }
}

export default Signup