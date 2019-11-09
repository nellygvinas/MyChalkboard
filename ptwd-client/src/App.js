import React from 'react';
import './App.css';
import axios from "axios";
import { Switch, Route, NavLink, Link } from "react-router-dom";

import Signup from "./components/user-pages/Signup";
import Login from "./components/user-pages/Login";
import Setup from "./components/setup/Setup";
// import Logout from "./components/user-pages/Logout"
import Home from "./components/Home";
import Role from "./components/Home";
import NewSchool from "./components/setup/NewSchool"
import NewClass from "./components/setup/NewClass"
import AddClass from "./components/setup/AddClass"


import CountriesList from "./components/CountriesList";


class App extends React.Component {

  constructor(){
    super();
    
    this.state = {
      currentUser: null
    }
  }

  componentDidMount(){
    axios.get(`${process.env.REACT_APP_API_URL}/checkuser`, { withCredentials: true })
    .then( responseFromTheBackend => {
      console.log("User in APP.JS: ", responseFromTheBackend)
      const { userDoc } = responseFromTheBackend.data;
      this.syncCurrentUser(userDoc);
    })
    .catch(err => console.log("Err while getting the user from the checkuser route: ", err))
  }

  syncCurrentUser(user){
    this.setState({ currentUser: user })
  }


  handleLogout(event){
    console.log("Handling logout");
    event.preventDefault();

    axios.delete(`${process.env.REACT_APP_API_URL}/logout`,
        this.state,
        // secure sending
        { withCredentials: true }
    )
    .then( responseFromServer => {
        console.log("response is:", responseFromServer.data, "the props ----- ", this.props);
        let userDoc = responseFromServer.data.userDoc;
        // this.props.onUserChange(userDoc);
        this.syncCurrentUser(userDoc);
        alert("You are logged out.")
    })
    .catch( err => {
        console.log("err: ", err)
        // if(err.response.data) return this.setState({ message: err.response.data.message })
    });
}




  render (){   
    // console.log("the state in APPJS: ", this.state);
    return (
      <div >
        <header>
          <nav>
            <NavLink to="/" > Home </NavLink>
            {/* If no current user, signup will show. */}
            { !this.state.currentUser && <NavLink to="/signup"> Signup </NavLink> }
            { !this.state.currentUser && <div> <NavLink to="/login"> Login </NavLink> </div> }
            <NavLink to="/countries" > Countries </NavLink>
          </nav>
            { this.state.currentUser && <Link to="/logout" onClick ={ event => this.handleLogout(event)}> Logout </Link> }  
        </header>
        <Switch>
        {/* this is example how we would render component normally */}
        {/* <Route exact path="/somePage" component={ someComponentThatWillRenderWhenThisRouteIsHit }   /> */}
          <Route exact path="/" component={ Home }   /> 
          <Route exact path="/countries" component={ CountriesList }  /> 
          <Route exact path="/setup/admin" component={ NewSchool }   /> 
          <Route exact path= "/setup/teacher" component={ NewClass }/> 
          <Route exact path= "/setup/parent" component={ AddClass }/> 
          <Route exact path= "/setup/class" component={ NewClass }/> 
          {/* if we have to pass some props down to a component,
          we can't use a standard way of rendering using component={},
          but instead we have to use render = {}  like in the example below */}
          <Route exact path="/signup" render = { () => 
            <Signup 
              currentUser = { this.state.currentUser }   
              onUserChange = { userDoc => this.syncCurrentUser(userDoc) }   
            /> 
          }/>

          {<Route exact path="/login" render = { () => 
            <Login 
              currentUser = { this.state.currentUser }   
              onUserChange = { userDoc => this.syncCurrentUser(userDoc) }   
            /> 
          }/>}

          

          

        </Switch>
          
          {/* <CountriesList /> */}
      </div>
    );
  }
}

export default App;
