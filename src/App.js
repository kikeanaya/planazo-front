import React, { Component } from 'react'
import './App.css'
import { Switch, Route } from 'react-router-dom'
import Signup from './Components/Auth/Signup'
import Login from './Components/Auth/Login'
import Navbar from './Components/Navbar'
import PlanList from './Components/Plans/PlansList'
import PlanDetails from './Components/Plans/PlanDetails'
import PlanService from './Services/PlanService'
import AuthService from './Services/AuthService'
import Footbar from './Components/Footbar'

class App extends Component {
  constructor(props){
    super(props)
    this.state = { loggedInUser: null }
    this.service = new PlanService()
    this.authService = new AuthService();
  }

  setTheUser= (userObj) => {
    this.setState({
      loggedInUser: userObj
    })
  }

  fetchUser() {
    // if (this.state.loggedInUser === null) {
    //   this.authService.loggedin()
    //     .then(response => this.setState({ loggedInUser: response }))
    //     .catch(x => this.setState({ loggedInUser: false }))
    // }
  }
  
  render() {
    this.fetchUser()
    if (!this.state.loggedInUser) {
    return (
      <div className="App">
        <Navbar userInSession={this.state.loggedInUser} />
        <header className="App-header">
          <Switch>
            <Route exact path='/planazo-front/' render={() => <PlanList userInSession={this.state.loggedInUser} setUser={this.setTheUser}/>}/>
            <Route exact path='/planazo-front/signup' render={() => <Signup setUser={this.setTheUser}/>}/>
            <Route exact path='/planazo-front/login' render={() => <Login setUser={this.setTheUser}/>}/>
            <Route exact path="/planazo-front/plans/:id" component={PlanDetails} />
          </Switch>
        </header>
        <Footbar/>
        <div className="view-alert">
          <p>View this website on mobile for a better experience </p>
        </div>
      </div>
    )

    } else{
      return (
        <div className="App">
          <Navbar userInSession={this.state.loggedInUser} setUser={this.setTheUser} />
          <header className="App-header">
            <Switch>
              <Route exact path='/planazo-front/' render={() => <PlanList userInSession={this.state.loggedInUser} setUser={this.setTheUser}/>}/>
              <Route exact path='/planazo-front/signup' render={() => <Signup setUser={this.setTheUser}/>}/>
              <Route exact path='/planazo-front/login' render={() => <Login setUser={this.setTheUser}/>}/>
              <Route exact path="/planazo-front/plans/:id" component={PlanDetails} />
            </Switch>
          </header>
          <Footbar/>
        </div>
      ) 
    }
  }
}

export default App