import React from "react";
import axios from "axios";
import { Switch, Route, NavLink, Link } from "react-router-dom";


export default class NewClass extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      schoolName: "",
      address: "",
      city:"",
      state: "",
      zip: "",
      role: "Admin",
      image: "",
      message: null
      }
    }

    componentDidMount(){
      console.log("This is a new class");
    }


    genericSync(event){
      console.log("The event.target is: ", event.target.value)
      const { name, value } = event.target;
      this.setState({ [name]: value });
    }

    handleSubmit (event){
      console.log("Form submitted. State is:", this.state);
      event.preventDefault();

      axios.post(
          // route we are hitting in the backend
          "http://localhost:3001/api/setup/class",
          // the data from the form (AKA req.body 🚀) that we are sending to this route to do the job
          this.state,
          // secure sending
          { withCredentials: true }
      )
      .then( responseFromServer => {
          // console.log("response is:", responseFromServer);
          const { userDoc } = responseFromServer.data;
          this.props.onUserChange(userDoc);
      })
      .catch( err => console.log("Err in class setup: ", err));
  }


    render(){


      return (
        <div>

         <h1>PLEASE CREATE A NEW CLASS</h1> 

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
                    <button> Create School </button>
                </form>

                {/* if the message is not null (basically if there's a message) then show it in this <div> tag */}
                { this.state.message && <div> { this.state.message } </div> }
          


        </div>


      )

    }












}