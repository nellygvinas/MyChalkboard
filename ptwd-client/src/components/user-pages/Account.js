import React from "react";
import axios from "axios";
import Setup from "../setup/Setup";
import { Switch, Route, NavLink, Link } from "react-router-dom";
// import { threadId } from "worker_threads";

export default class Account extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            fullName: this.props.currentUser.fullName,
            email: this.props.currentUser.email,
            password: this.props.currentUser.fullName,
            message: null,
            role: this.props.currentUser.role
        }
    }

    componentDidMount() {
      
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
            `${process.env.REACT_APP_API_URL}/account/name/`+this.props.currentUser._id,
            // the data from the form (AKA req.body 🚀) that we are sending to this route to do the job
            this.state,
            // secure sending
            { withCredentials: true }
        )
        .then( responseFromServer => {
            
          
          axios.get(`${process.env.REACT_APP_API_URL}/account/`+this.props.currentUser._id, { withCredentials: true })
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
          `${process.env.REACT_APP_API_URL}/account/email/`+this.props.currentUser._id,
          // the data from the form (AKA req.body 🚀) that we are sending to this route to do the job
          this.state,
          // secure sending
          { withCredentials: true }
      )
      .then( responseFromServer => {
          
        
        axios.get(`${process.env.REACT_APP_API_URL}/account/`+this.props.currentUser._id, { withCredentials: true })
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
        `${process.env.REACT_APP_API_URL}/account/password/`+this.props.currentUser._id,
        // the data from the form (AKA req.body 🚀) that we are sending to this route to do the job
        this.state,
        // secure sending
        { withCredentials: true }
    )
    .then( responseFromServer => {
        
      
      axios.get(`${process.env.REACT_APP_API_URL}/account/`+this.props.currentUser._id, { withCredentials: true })
      .then( userDataFromServer => {
        console.log("User found after edit: ", userDataFromServer.data.theUpdatedUser)
        

        })
      .catch(err => console.log("Err while searching for user: ", err))
        
    })
    .catch( err => console.log("Err in update password: ", err));
}





    render(){
      
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

            {/* if the message is not null (basically if there's a message) then show it in this <div> tag */}
            { this.state.message && <div> { this.state.message } </div> }
        
        </section>


        )
    }
}