import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import logo from '../Images/planazo.png'
import AuthService from '../Services/AuthService';

class Navbar extends Component {
  constructor(props){
    super(props)
    this.state = { loggedInUser: null }
    this.service = new AuthService()
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ ...this.state, loggedInUser: nextProps["userInSession"] })
  }

  logoutUser = () => {
    this.service.logout()
      .then(() => {
        this.setState({ loggedInUser: null });
        this.props.setUser(null);
      })
  }

  render(){
    if (this.state.loggedInUser) {
      return(   
        <nav className="nav-style">
          <div className="logo-container">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="app-title">PLANAZO</h1>
          </div>
          <Link to='/'>
            <button className="logout" onClick={() => this.logoutUser()}></button>
          </Link>
        </nav>
    )
  }
  else {
    return(   
      <nav className="nav-style">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="app-title">PLANAZO</h1>
          <Link to='/login' className="login"></Link>
      </nav>
    )
  }
}
}

export default Navbar