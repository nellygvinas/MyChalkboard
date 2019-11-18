import React from "react";
import axios from "axios";
import { Switch, Route, NavLink, Link } from "react-router-dom";
import NewClass from "../setup/NewClass"



export default class NewSchool extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      currentUser: {
        userId: this.props.location.state.currentUser.userId,
        fullName: this.props.location.state.currentUser.fullName,
        email: this.props.location.state.currentUser.email,
        role: this.props.location.state.currentUser.role
        },
      schoolName: "",
      address: "",
      city:"",
      state: "",
      zip: "",
      role: "Admin",
      image: "",
      message: null,
      schoolAdded: false,
      schoolId: "",
      creator: this.props.location.state.currentUser.userId
    }
  }
  
  
  componentDidMount(){
    console.log("State upon mount - New school component: ", this.state)
    console.log("props on NewSchool mount: ", this.props)
    const userRole = this.state.currentUser.role

    axios.put(
      // route we are hitting in the backend
      `${process.env.REACT_APP_API_URL}/setup/role`,
      // the data from the form (AKA req.body 🚀) that we are sending to this route to do the job
      this.state.currentUser,
      // secure sending
      { withCredentials: true }
    )
    .then( responseFromServer => {
        console.log("Response from server after role post is:", responseFromServer.data);
    
        axios.get(`${process.env.REACT_APP_API_URL}/setup/role`+this.props.location.state.currentUser.userId, { withCredentials: true })
        .then( responseFromTheBackend => {
          console.log("User found after role assigned: ", responseFromTheBackend.data.theUpdatedUser)
          this.setState({ currentUser: {role: responseFromTheBackend.data.theUpdatedUser }}, () => {
            console.log("State after role assigned:", this.state)}
            );
  
          })
        .catch(err => console.log("Err while searching for teacher: ", err))
    
    })
    .catch( err => console.log("Err in role setup: ", err)); 
    
  }


  
  showAddedSchool(){
    
    if (this.state.schoolAdded)
    
    return(
      
      <div>

          <h3>The School has been added: {this.state.schoolName}</h3>
          <h4>School Address: {this.state.address}</h4>
          {this.state.city}
          {this.state.state}
          {this.state.zip}

        <div>
        <Link to={{
          pathname: "/setup/class",
          state: {
          schoolId: this.state.schoolId,
          schoolName: this.state.schoolName
          }
          }}>Add Classes</Link>

        </div>   
          
          </div>
        )
        
      }
      
      
      genericSync(event){
        // console.log("The event.target is: ", event.target.value)
        const { name, value } = event.target;
        this.setState({ [name]: value });
        console.log("The state while changing:", this.state)
      }
      
      handleSubmit (event){
        
        event.preventDefault();
        this.setState({ schoolAdded: true });
        
        axios.post(
          // route we are hitting in the backend
          `${process.env.REACT_APP_API_URL}/setup/school`,
          // the data from the form (AKA req.body 🚀) that we are sending to this route to do the job
          this.state,
          // secure sending
          { withCredentials: true }
          )
          .then( responseFromServer => {
            console.log("Response from server after post is:", responseFromServer.data);
            
            // if(responseFromServer.data) return this.setState({ message: responseFromServer.data.message })
            this.setState({ schoolId: responseFromServer.data.school._id });
            
            console.log("Form submitted. The state is:", this.state);
          })
          .catch( err => {
            // console.log("Err in school setup: ", err)
            if(err.data) return this.setState({ message: err.data.message }) 
          })
          
          
        }
        
        
      render(){
          
        return (
        <div>

         <h1>PLEASE CREATE A NEW SCHOOL</h1> 

              <form onSubmit ={ event => this.handleSubmit(event) } >
            
                    <label> School Name: </label>
                    <input
                        // value={schoolName} // this.state.schoolName
                        onChange = { event => this.genericSync(event) } 
                        type="text"
                        name="schoolName"
                        placeholder="MyChalkboard Academy"
                    />

                    <label> Address: </label>
                    <input
                        // value={address} // this.state.address
                        onChange = { event => this.genericSync(event) } 
                        type="text"
                        name="address"
                        placeholder="12345 Main Drive"
                    />

                    <label> City: </label>
                    <input
                        // value={address} // this.state.address
                        onChange = { event => this.genericSync(event) } 
                        type="text"
                        name="city"
                        placeholder="Miami"
                    />

                    <label> State: </label>
                    <input
                        // value={address} // this.state.address
                        onChange = { event => this.genericSync(event) } 
                        type="text"
                        name="state"
                        placeholder="FL"
                    />

                    <label> Zip: </label>
                    <input
                        // value={address} // this.state.address
                        onChange = { event => this.genericSync(event) } 
                        type="text"
                        name="zip"
                        placeholder="Miami"
                    />

                    <button> Create School </button>
                </form>

                {/* if the message is not null (basically if there's a message) then show it in this <div> tag */}
                { this.state.message && <div> { this.state.message } </div> }

                { this.state.schoolAdded && <div> { this.state.message } </div> }
          
            
            {this.showAddedSchool()}


        </div>


      )

    }












}