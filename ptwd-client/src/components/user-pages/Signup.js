import React from "react";
import axios from "axios";
import Setup from "../setup/Setup";
import { Switch, Route, NavLink, Link } from "react-router-dom";
// import { threadId } from "worker_threads";

export default class Signup extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            fullName: "",
            email: "",
            password:"",
            message: null,
            role: "Unassigned",
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

        axios.post(
            // route we are hitting in the backend
            `${process.env.REACT_APP_API_URL}/signup`,
            // the data from the form (AKA req.body 🚀) that we are sending to this route to do the job
            this.state,
            // secure sending
            { withCredentials: true }
        )
        .then( responseFromServer => {
            const { userDoc } = responseFromServer.data;
            this.props.onUserChange(userDoc);
            console.log("userDoc from signup:", userDoc);
        })
        .catch( err => console.log("Err in signup: ", err));
    }

    render(){
        console.log("User props in Signup? This.props.currentUser: ", this.props.currentUser)
        // console.log("The current user's role:", this.props.currentUser[0])
        // const userProps = {fullName: this.props.currentUser.fullName, email: this.props.currentUser.email, role: this.props.currentUser.role};
        const { fullName, email, password, role } = this.state;
        console.log("SIGNUP STATE: ", this.state);
        if(this.props.currentUser){
            return(
            
            <div>

            <Setup 
              currentUser = { this.props.currentUser } 
            />         
            </div>
            )
        }

        return (
            <section>
                <h2> Sign up </h2>
                <form onSubmit = {event => this.handleSubmit(event) } >
                                        
                    <label> Full name: </label>
                    <input
                        value={fullName} // this.state.fullName
                        onChange = { event => this.genericSync(event) } 
                        type="text"
                        name="fullName"
                        placeholder="Jane Doe"
                    />

                    <label> Email: </label>
                    <input
                        value={email} // this.state.email
                        onChange = { event => this.genericSync(event) } 
                        type="email"
                        name="email"
                        placeholder="my-email@ironhack.com"
                    />

                    <label> Password</label>
                    <input
                        value={password} // this.state.password
                        onChange = { event => this.genericSync(event) } 
                        type="password"
                        name="password"
                        placeholder="***********"
                    />
                    <button> Sign Up </button>
                </form>
                {/* if the message is not null (basically if there's a message) then show it in this <div> tag */}
                { this.state.message && <div> { this.state.message } </div> }
            
            </section>





        )
    }
}