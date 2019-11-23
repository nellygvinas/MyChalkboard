import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Setup from "../setup/Setup"
import AddTeacher from "../setup/AddTeacher"
import SchoolList from "../school/SchoolList"
import Login from "../user-pages/Login"
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
      allClasses: null,
      currentUser: this.props.currentUser
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

      if (!this.state.allClasses)  {
        return  <div/>
      } 

      return (
        
        <div className="landing">

          {this.props.currentUser.role == "Admin" &&          
            <AdminLanding
            currentUser={this.props.currentUser}
            allClasses={this.state.allClasses}
            ></AdminLanding>
          
          }

          {this.props.currentUser.role == "Teacher" && 
           
             <TeacherLanding
            currentUser={this.props.currentUser}
            allClasses={this.state.allClasses}
            ></TeacherLanding>

          }


          {this.props.currentUser.role == "Parent" && 
           <div className="page-landing">
             PARENT LANDING PAGE
           </div>
          } 

          {this.props.currentUser.role == "Unassigned" && 
           <div className="page-landing">
             Please complete setup
             <Setup 
              currentUser = { this.props.currentUser } 
            />         
           </div>} 
                



        </div>


      )


    }




  }
