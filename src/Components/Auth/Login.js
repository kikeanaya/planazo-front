import React, { Component } from 'react'
import AuthService from '../../Services/AuthService'
import { Link } from 'react-router-dom'

class Login extends Component {
  constructor(props){
    super(props)
    this.state = { username: '', password: '' }
    this.service = new AuthService()
  }

  handleFormSubmit = (event) => {
    event.preventDefault()
    const username = this.state.username
    const password = this.state.password

    this.service.login(username, password)
    .then( response => {
        this.setState({ 
            username: "", 
            password: "" 
        })
        this.props.setUser(response)
        window.location.assign('/planazo-front/')

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
          <input type="text" name="username" placeholder="username" autoComplete="off" value={this.state.username} onChange={ e => this.handleChange(e)}/>
          <input type="password" name="password" placeholder="password" autoComplete="off" value={this.state.password} onChange={ e => this.handleChange(e)} />
          
          <input type="submit" value="Login" />
          <p className="redirect-auth">Don't have an account? 
            <Link to={"/planazo-front/signup"}> Signup here.</Link>
          </p>
        </form>
      </div>
    )
  }
}

export default Login