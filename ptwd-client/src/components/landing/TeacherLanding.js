import React from "react";
import axios from "axios";
// import { Switch, Route, NavLink, Link } from "react-router-dom";
// import AddTeacher from "../setup/AddTeacher"
// import SchoolList from "../school/SchoolList"
import ClassList from "../class/ClassList"
import Posting from "../posts/Posting"
import File from "../files/File"


export default class TeacherLanding extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      classId: "",
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
      allClasses: this.props.allClasses,
    }
  }


    componentDidMount(){

      console.log("Props on TeacherLanding mount: ", this.props )
      console.log("State of TeacherLanding component on mount: ", this.state)
      
    }


    render(){

      return (
        
        <div>

          <div>
          <h2> Teacher LANDING PAGE </h2> 


          <div className="classlist">
            <ClassList
            currentUser={this.props.currentUser}
            allClasses={this.state.allClasses}
            // onUserChange = { userDoc => this.syncCurrentUser(userDoc) }
            ></ClassList>

          </div>

          <div>
            <Posting
            allClasses={this.state.allClasses}
            currentUser={this.props.currentUser}
            // classId={this.props.classId} 
            >

              POSTING LIST
            </Posting>

          </div>


          <div>
            <File
            currentUser={this.props.currentUser}
            allClasses={this.state.allClasses}>
              
            </File>


          </div>



          </div>
                



        </div>


      )


    }




  }
