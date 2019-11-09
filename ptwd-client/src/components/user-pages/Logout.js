import React from "react";
import axios from "axios";


export default class Logout extends React.Component {

    constructor(){
        super();
        this.state = {
            email: "",
            password:"",
            message: null
        }
    }

    genericSync(event){
        // console.log("what is: ", event.target.value)
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleSubmit (event){
        // console.log("submitting form");
        event.preventDefault();

        axios.delete(
            // route we are hitting in the backend
            `${process.env.REACT_APP_API_URL}/logout`,
            // the data from the form (AKA req.body 🚀) that we are sending to this route to do the job
            this.state,
            // secure sending
            { withCredentials: true }
        )
        .then( responseFromServer => {
            // console.log("response is:", responseFromServer);
            const { userDoc } = responseFromServer.data;
            this.props.onUserChange(userDoc);
            alert("You are logged out.")
        })
        .catch( err => {
            // console.log("err: ", err.response)
            if(err.response.data) return this.setState({ message: err.response.data.message })
        });
    }



    render(){
        
        return (
          <div>

          <a href="/logout" onClick ={ event => this.handleSubmit(event)} >
          Logout
          </a>  
                    
          </div>
            
        )
      }
    }