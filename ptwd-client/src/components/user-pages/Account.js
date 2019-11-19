import React from "react";
import axios from "axios";
import Setup from "../setup/Setup";
import { Switch, Route, NavLink, Link } from "react-router-dom";
// import { threadId } from "worker_threads";
import Home from "../user-pages/Signup"
import Login from "../user-pages/Login"

export default class Account extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            userId: this.props.location.state.currentUser.userId, 
            fullName: this.props.location.state.currentUser.fullName,
            email: this.props.location.state.currentUser.email,
            password: "",
            message: null,
            role: this.props.location.state.currentUser.role
        
        }

    }

    componentDidMount() {
      console.log("Props from Account component on mount: ", this.props)
      console.log("State from Account component on mount: ", this.state)
    }


    genericSync(event){
        // console.log("what is: ", event.target.value)
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }


    updateName (event){
        // console.log("submitting form");
        event.preventDefault();

        axios.put(
            // route we are hitting in the backend
            `${process.env.REACT_APP_API_URL}/account/name/`+this.state.userId,
            // the data from the form (AKA req.body 🚀) that we are sending to this route to do the job
            this.state,
            // secure sending
            { withCredentials: true }
        )
        .then( responseFromServer => {
            
          
          axios.get(`${process.env.REACT_APP_API_URL}/account/`+this.state.userId, { withCredentials: true })
          .then( userDataFromServer => {
            console.log("User found after edit: ", userDataFromServer.data.theUpdatedUser)
            
    
            })
          .catch(err => console.log("Err while searching for user: ", err))
            
        })
        .catch( err => console.log("Err in signup: ", err));
    }


    updateEmail (event){
      // console.log("submitting form");
      event.preventDefault();

      axios.put(
          // route we are hitting in the backend
          `${process.env.REACT_APP_API_URL}/account/email/`+this.state.userId,
          // the data from the form (AKA req.body 🚀) that we are sending to this route to do the job
          this.state,
          // secure sending
          { withCredentials: true }
      )
      .then( responseFromServer => {
          
        
        axios.get(`${process.env.REACT_APP_API_URL}/account/`+this.state.userId, { withCredentials: true })
        .then( userDataFromServer => {
          console.log("User found after edit: ", userDataFromServer.data.theUpdatedUser)
          
  
          })
          .catch(err => console.log("Err while searching for user: ", err))
          
        })
        .catch( err => console.log("Err in signup: ", err));
      }
      
      
      updatePassword (event){
        // console.log("submitting form");
        event.preventDefault();
        
        axios.put(
          // route we are hitting in the backend
          `${process.env.REACT_APP_API_URL}/account/password/`+this.state.userId,
          // the data from the form (AKA req.body 🚀) that we are sending to this route to do the job
          this.state,
          // secure sending
          { withCredentials: true }
          )
          .then( responseFromServer => {
            
            
            axios.get(`${process.env.REACT_APP_API_URL}/account/`+this.state.userId, { withCredentials: true })
            .then( userDataFromServer => {
              console.log("User found after edit: ", userDataFromServer.data.theUpdatedUser)
              
              
            })
            .catch(err => console.log("Err while searching for user: ", err))
            
          })
          .catch( err => console.log("Err in update password: ", err));
        }
        
        
        deleteAccount(event){

          window.confirm("Please confirm that you wish to delete your user Account before proceeding. All user data will be removed once submitted.")
          
          event.preventDefault();
          
          axios.post(`${process.env.REACT_APP_API_URL}/account/`+this.state.userId, { withCredentials: true })
          .then( responseFromServer => {
          console.log("User deleted: ", responseFromServer.data.theDeletedUser)   

          })
          .catch( err => console.log("Err in delete: ", err)
          )
       }




    render(){

      console.log("this.props:", this.props)
      
      return (
        <section>

            <h2> {this.state.fullName} </h2>
            
            <form onSubmit = {event => this.updateName(event)} >                    
              <label> User Name: </label>
              <input
                  value={this.state.fullName} // this.state.fullName
                  onChange = { event => this.genericSync(event) } 
                  type="text"
                  name="fullName"
                  placeholder={this.state.fullName}
              />
              <button> Save </button>
            </form>

            <form onSubmit = {event => this.updateEmail(event)}>           
                <label> Email: </label>
                <input
                    value={this.state.email} // this.state.email
                    onChange = { event => this.genericSync(event) } 
                    type="email"
                    name="email"
                    placeholder={this.state.email}
                />
              <button> Save Email </button>
            </form>

            <form onSubmit = {event => this.updatePassword(event)}>
                <label> Password</label>
                <input
                    value={this.state.password} // this.state.password
                    onChange = { event => this.genericSync(event) } 
                    type="password"
                    name="password"
                    placeholder="Your password"
                />
                <button> Update Password </button>
            </form>

            <button onClick={event => this.deleteAccount(event)}>Delete Account</button>

            {/* if the message is not null (basically if there's a message) then show it in this <div> tag */}
            { this.state.message && <div> { this.state.message } </div> } 
        
        </section>


        )
    }
}