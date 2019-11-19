import React from "react";
import axios from "axios";
import { Switch, Route, NavLink, Link } from "react-router-dom";
import Role from "../setup/Role";


export default class Setup extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      currentUser: {
        userId: this.props.currentUser._id,
        fullName: this.props.currentUser.fullName,
        email: this.props.currentUser.email,
        role: this.props.currentUser.role
      },
      classes: "",
      image: "",
      message: null
      }
    }

    componentDidMount(){
      console.log("Setup component - Initial state upon mount", this.state)
    }

    shouldComponentUpdate() {
      

    }


    handleRole(){
    
      console.log("submitting handle role");

      axios.put(
          // route we are hitting in the backend
          `${process.env.REACT_APP_API_URL}/setup/role`,
          // the data from the form (AKA req.body 🚀) that we are sending to this route to do the job
          this.state.role,
          // secure sending
          { withCredentials: true }
        )
        .then( responseFromServer => {
            console.log("response is:", responseFromServer);
        })
        .catch( err => console.log("Err in role setup: ", err)); 

    } //end of handleRole


    assignAdmin() {
      this.setState(({currentUser}) => ({currentUser: {
        ...currentUser,
        role: "Admin",
      }}))
    
    console.log("State after assign Admin", this.state.currentUser)
    }

    assignTeacher(){
      this.setState({ role: "Teacher" })
      console.log("This.state Role assigned as Teacher:", this.state.role)
      this.handleRole()
    }

    assignParent() {
      this.setState({ role: "Parent" })
      console.log("This.state Role assigned as Parent:", this.state.role)
      this.handleRole()
    }




    render(){

      console.log("Do I have user props in Setup? This.props.currentUser: ", this.props.currentUser)

      return (

        <div>
          <h1>SETUP COMPONENT</h1>

           <h2> Welcome, {this.props.currentUser.fullName}! Please select your role: </h2>
          

          <div>
           {/* <Link to= "/setup/admin" onClick={() => this.assignAdmin()}> Administrator </Link>
          </div> */}

          <Link to={{
            pathname: '/setup/admin',
            state: {
              currentUser: {
                userId: this.props.currentUser._id,
                fullName: this.props.currentUser.fullName,
                email: this.props.currentUser.email,
                role: "Admin"
              }
            }}
            }> Administrator </Link>
          </div>
          
          <div>
          <Link to={{
            pathname: '/setup/teacher',
            state: {
              currentUser: {
                userId: this.state.currentUser.userId,
                fullName: this.props.currentUser.fullName,
                email: this.props.currentUser.email,
                role: "Teacher"
              }
            }}
            }> Teacher </Link>
          </div>

          <div>
          <Link to= "/setup/parent" onClick={this.assignParent}> Parent </Link>
          </div>     
           



        </div>
      )



    }  

} // end of Setup component

