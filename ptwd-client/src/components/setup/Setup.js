import React from "react";
import axios from "axios";
import { Switch, Route, NavLink, Link } from "react-router-dom";
import Role from "../setup/Role";


export default class Setup extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      fullName: "",
      email: "",
      password:"",
      role: "Unassigned",
      classes: "",
      image: "",
      message: null
      }
    }

    genericSync(event){
      // console.log("what is: ", event.target.value)
      const { name, value } = event.target;
      this.setState({ [name]: value })
    }

    syncCurrentUSer(user){
      this.setState({ currentUser: user })
    }

    handleRole (event){
    // console.log("submitting form");
    /*event.preventDefault();

      axios.put(
          // route we are hitting in the backend
          "http://localhost:3001/api/setup/role",
          // the data from the form (AKA req.body 🚀) that we are sending to this route to do the job
          this.state,
          // secure sending
          { withCredentials: true }
        )
        .then( responseFromServer => {
            // console.log("response is:", responseFromServer);
            const { userDoc } = responseFromServer.data;
            // this.props.onUserChange(userDoc);
        })
        .catch( err => console.log("Err in role setup: ", err)); */

    } //end of handleSubmit


    render(){

      console.log("Do I have user props in Setup? This.props.currentUser: ", this.props.fullName, this.props.role)


      return (

        <div>
          <h1>SETUP COMPONENT</h1>

           <h2> Welcome, {this.props.fullName}! Please select your role: </h2>
          
          <div>
           <Link to= "/setup/admin"> Administrator </Link>
          </div>
           
          <div>
          <Link to= "/setup/teacher"> Teacher </Link>
          </div>

          <div>
          <Link to= "/setup/parent"> Parent </Link>
          </div>     
           

           <Role 
              onUserChange = { userDoc => this.syncCurrentUser(userDoc) }   
            /> 


        </div>
      )



    }  

} // end of Setup component

