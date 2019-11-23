import React from 'react';
import './App.css';
import axios from "axios";
import { Switch, Route, NavLink, Link, Redirect } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import Signup from "./components/user-pages/Signup";
import Login from "./components/user-pages/Login";
import Setup from "./components/setup/Setup";
// import Logout from "./components/user-pages/Logout"
import Home from "./components/Home";
import Account from "./components/user-pages/Account"
import Role from "./components/Home";
import NewSchool from "./components/setup/NewSchool"
import NewClass from "./components/setup/NewClass"
import AddClass from "./components/setup/AddClass"
import FindClass from "./components/setup/FindClass"
import Landing from "./components/landing/Landing"
import SchoolBox from './components/school/SchoolBox';
import ClassBox from "./components/class/ClassBox"
import ClassDetails from "./components/class/ClassDetails"
import PostDetails from "./components/posts/PostDetails"





class App extends React.Component {

  constructor(){
    super();
    
    this.state = {
      currentUser: null,
      loggedIn: false,
      message: null
      // redirect: false
    }
  }

  componentDidMount(){
    axios.get(`${process.env.REACT_APP_API_URL}/checkuser`, { withCredentials: true })
    .then( responseFromTheBackend => {
      console.log("User in APP.JS: ", responseFromTheBackend)
      const { userDoc } = responseFromTheBackend.data;
      this.syncCurrentUser(userDoc);
      // this.setState({ loggedIn: true }, () => {console.log("State after user found:", this.state.loggedIn)})
    })
    .catch(err => {
      console.log("Err while getting the user from the checkuser route: ", err)})
  }



  syncCurrentUser(user){
    this.setState({ currentUser: user}, () => {console.log("State after user set:", this.state)})
    
  }

  // renderRedirect = () => {
  //   if (this.state.redirect) {
  //     return <Redirect to='/' />
  //   }
  // }


  handleLogout(event){
    this.setState({ loggedIn: false }, () => {console.log("State after user logout:", this.state.loggedIn)})
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

        // if (!userDoc) {
        //   return <Redirect to='/login' />
        // }
        // possible  set state for redirecting:
        // this.setState({ redirect: true }, () => {console.log("State after user not found:", this.state.currentUser)})
    })
    .catch( err => {
        console.log("err: ", err)
        // if(err.response.data) return this.setState({ message: err.response.data.message })
    });

  
  
    
  }




  render (){   
    // console.log("the state in APPJS: ", this.state);
    // if (!this.state.currentUser) {
    //   return <Redirect to='/'
    //   currentUser = { this.state.currentUser }   
    //   onUserChange = { userDoc => this.syncCurrentUser(userDoc)} />
    // }


    return (

      <div className="App">
        <header>
         <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <NavLink className="navbar-brand" to="/login" > <img className="img-responsive" src="logo.png" style={{width: '150px',height: '50px'}}/> 
            </NavLink>
            {/* If no current user, signup will show. */}
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
            { !this.state.currentUser && <NavLink className="nav-link" to="/signup"> Signup </NavLink> }
              </li>
              <li className="nav-item">
            { !this.state.currentUser && <div> <NavLink class="nav-link" to="/login"> Login </NavLink> </div> }
              </li>

            {/* If current user is signed in, Nav will show: */}
            <div>
            { this.state.currentUser && <Link to="/logout" onClick ={ event => this.handleLogout(event)}> Logout </Link> }  
            { this.state.currentUser && <NavLink to="/landing"> Landing </NavLink> }
            
            { this.state.currentUser && 
            //  <NavLink to="/account"> Account </NavLink>
             
             <NavLink to={{
                pathname: `/account`,
                state: {
                  currentUser: {
                    userId: this.state.currentUser._id,
                    fullName: this.state.currentUser.fullName,
                    email: this.state.currentUser.email,
                    role: this.state.currentUser.role
                  }
                }
              }}> Account </NavLink>}


                </div>
                </ul>
            </div>
            </div>
         </nav>
        </header>
            
        
        <Switch>
        {/* this is example how we would render component normally */}
        {/* <Route exact path="/somePage" component={ someComponentThatWillRenderWhenThisRouteIsHit }   /> */}
        
        
         {/* <Route exact path="/" render = { () => 
            <Home 
              currentUser = { this.state.currentUser }   
              onUserChange = { userDoc => this.syncCurrentUser(userDoc) }   
            /> 
          }/> */}
          <Route exact path="/" component = {Home}/>


          {/* if we have to pass some props down to a component,
          we can't use a standard way of rendering using component={},
          but instead we have to use render = {}  like in the example below */}
          <Route exact path="/signup" render = { () => 
            <Signup 
              currentUser = { this.state.currentUser }   
              onUserChange = { userDoc => this.syncCurrentUser(userDoc) }   
            /> 
          }/>

          <Route exact path="/login" render = { () => 
            <Login 
              currentUser = { this.state.currentUser }   
              onUserChange = { userDoc => this.syncCurrentUser(userDoc) }   
            /> 
          }/>
        
          
          <Route exact path="/account" component = {Account}/>

          {/* {<Route exact path="/account" render = { () => 
            <Account
              currentUser = { this.state.currentUser }   
              onUserChange = { userDoc => this.syncCurrentUser(userDoc) }   
            /> 
          }/>} */}
          
          <Route exact path="/setup/admin" component={ NewSchool }   /> 
          
          <Route exact path= "/setup/teacher" component={ FindClass } /> 
          
          <Route exact path= "/setup/parent" component={ AddClass }/> 
          
          <Route exact path="/setup/class" component={ NewClass }/>

          <Route exact path="/setup/admin" render = { () => 
            <NewSchool
              currentUser = { this.state.currentUser }   
              // onUserChange = { userDoc => this.syncCurrentUser(userDoc) }   
            /> 
          }/>

          <Route exact path="/school/details/:schoolId" component = {SchoolBox} /> 
        
          <Route exact path="/class/details/:classlId" component = {ClassDetails} /> 


          <Route exact path="/landing" render = { () => 
            <Landing
              currentUser = { this.state.currentUser }   
              onUserChange = { userDoc => this.syncCurrentUser(userDoc) }
            /> 
            }
          />
          


          <Route exact path="/post/details/:postId" component = {PostDetails} />


          

        </Switch>
        
          
          
      </div>
    );
  }
}

export default App;
