import React from "react";
import axios from "axios";
import AdminLanding from "../landing/AdminLanding"
import Landing from "../landing/Landing"



export default class Login extends React.Component {

    constructor(){
        super();
        this.state = {
            email: "",
            password:"",
            message: null,
            role: "",
            loggedIn: false,

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
            `${process.env.REACT_APP_API_URL}/login`,
            // the data from the form (AKA req.body 🚀) that we are sending to this route to do the job
            this.state,
            // secure sending
            { withCredentials: true }
        )
        .then( responseFromServer => {
            
            const { userDoc } = responseFromServer.data;
            this.props.onUserChange(userDoc);
            
            this.setState({ loggedIn: true }, ()=>{console.log("state after logged in from login comp: ", this.state)});

        })
        .catch( err => {
            console.log("err: ", err.response.data)
            // if(err.response.data) return this.setState({ message: err.response.data.message })
        });
    }



    render(){
        
        const { fullName, email, password } = this.state;


        return (

            <div>

            {!this.state.loggedIn &&
            
            <div className="auth-wrapper">
            <div className="auth-inner">

            <section>
                <form onSubmit ={ event => this.handleSubmit(event) } >
               
                <h2> Login </h2>
                
                <div className="form-group">
                    <label> Email: </label>
                    <input
                        value={email} // this.state.email
                        onChange = { event => this.genericSync(event) } 
                        type="email"
                        className="form-control"
                        name="email"
                        placeholder="my-email@ironhack.com"
                    />
                </div>

                <div className="form-group">
                    <label> Password</label>
                    <input
                        value={password} // this.state.password
                        onChange = { event => this.genericSync(event) } 
                        type="password"
                        className="form-control"
                        name="password"
                        placeholder="***********"
                    />
                </div>

                    <button type="submit" className="btn btn-info"> Login </button>
                </form>
            </section>

            </div>
            </div>
            }
                {/* if the message is not null (basically if there's a message) then show it in this <div> tag */}
                { this.state.message && <div> { this.state.message } </div> }
            




            {this.state.loggedIn && 
            
            <Landing
            currentUser = {this.props.currentUser}
            />
            
            }

            
            </div>

        )
    }
}