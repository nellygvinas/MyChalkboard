import React from "react";
import axios from "axios";
// import { Switch, Route, NavLink, Link } from "react-router-dom";
import Setup from "../setup/Setup"
import AddTeacher from "../setup/AddTeacher"
import SchoolList from "../school/SchoolList"
import AdminLanding from "./AdminLanding"

export default class Landing extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      classId: this.props.classId,
      className: "",
      teacher: {
        teacherName: "",
        teacherId: ""},
      teacherAdded: false,
      schoolName: "",
      schoolId: "",
      classCode: "",
      creator: "",
      parents: [],
    }
  }


    componentDidMount(){

      console.log("Props on Landing mount: ", this.props )
      console.log("State of Landing component on mount: ", this.state)

      // axios.get(`${process.env.REACT_APP_API_URL}/checkuser`, { withCredentials: true })
      // .then( responseFromTheBackend => {
      //   console.log("User in LANDING: ", responseFromTheBackend)
      //   const { userDoc } = responseFromTheBackend.data;
      //   this.props.onUserChange(userDoc);
      //   console.log("userDoc from landing:", userDoc);

      // })
      // .catch(err => {
      //   console.log("Err while getting the user from the checkuser route: ", err)})



  
    }


    render(){

      return (
        
        <div>

        
          <h2>YOUR LANDING PAGE </h2> 


          {this.props.currentUser.role == "Admin" && 
          
            <div>
            <AdminLanding
            currentUser={this.props.currentUser}
            ></AdminLanding>
            </div>
          
          }

          {this.props.currentUser.role == "Teacher" && 
           <div>
             TEACHER LANDING 
           </div>

          }


          {this.props.currentUser.role == "Parent" && 
           <div>
             PARENT LANDING PAGE
           </div>
          } 

          {this.props.currentUser.role == "Unassigned" && 
           <div>
             Please complete setup

             <Setup 
              currentUser = { this.props.currentUser } 
            />         
            

           </div>} 
                



        </div>


      )


    }




  }
