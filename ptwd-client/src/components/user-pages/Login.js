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
            // console.log("response is:", responseFromServer);
            const { userDoc } = responseFromServer.data;
            this.props.onUserChange(userDoc);
            alert("You are logged in.")
            this.setState({ loggedIn: true });

            // axios.get(`${process.env.REACT_APP_API_URL}/classinfo/`+newClassId, { withCredentials: true })
            // .then( responseForGetClass => {
            //   console.log("Class found: ", responseForGetClass.data)
              

            //   this.setState({ classId: responseForGetClass.data.classFound._id, classCode: responseForGetClass.data.classFound.classCode, classAdded: true, 
            //   creator: responseForGetClass.data.classFound.creator }, 
            //   () => {
            //     console.log("State after post, class added and creator assigned:", this.state)
            // });

            //   })
            // .catch(err => console.log("Err while searching for class: ", err))



        })
        .catch( err => {
            // console.log("err: ", err.response)
            if(err.response.data) return this.setState({ message: err.response.data.message })
        });
    }



    render(){
        
        const { fullName, email, password } = this.state;

        return (

            <div>

            {!this.state.loggedIn &&
            <section>
                <h2> Login </h2>
                <form onSubmit ={ event => this.handleSubmit(event) } >
            
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
                    <button> Login </button>
                </form>
                {/* if the message is not null (basically if there's a message) then show it in this <div> tag */}
                { this.state.message && <div> { this.state.message } </div> }
            </section>
            }

            {this.state.loggedIn && 
            
            <Landing
            currentUser = {this.props.currentUser}
            />
            
            }

            </div>

        )
    }
}