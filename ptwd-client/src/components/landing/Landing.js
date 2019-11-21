import React from "react";
import axios from "axios";
// import { Switch, Route, NavLink, Link } from "react-router-dom";
import Setup from "../setup/Setup"
import AddTeacher from "../setup/AddTeacher"
import SchoolList from "../school/SchoolList"
import AdminLanding from "./AdminLanding"
import TeacherLanding from "./TeacherLanding"

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
      allClasses: null
    }
  }


    componentDidMount(){

      axios.get(`${process.env.REACT_APP_API_URL}/getclasses/`+this.props.currentUser._id,{ withCredentials: true })
      .then( responseFromTheBackend => {
        console.log("Classes found: ", responseFromTheBackend.data.classesFound)
        this.setState({ allClasses: responseFromTheBackend.data.classesFound}, () => {
          console.log("State after classes Found:", this.state)}
          );

        })
      .catch(err => console.log("Err while searching for classes: ", err))



  
    }


    render(){

      if (!this.state.allClasses) {
        return <div />
      }

      return (
        
        <div>

        
          <h2>YOUR LANDING PAGE </h2> 


          {this.props.currentUser.role == "Admin" && 
          
            <div>
            <AdminLanding
            currentUser={this.props.currentUser}
            allClasses={this.state.allClasses}
            ></AdminLanding>
            </div>
          
          }

          {this.props.currentUser.role == "Teacher" && 
           <div>
             <TeacherLanding
            currentUser={this.props.currentUser}
            allClasses={this.state.allClasses}
            ></TeacherLanding>
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
