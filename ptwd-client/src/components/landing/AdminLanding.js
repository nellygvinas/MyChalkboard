import React from "react";
import axios from "axios";
// import { Switch, Route, NavLink, Link } from "react-router-dom";
import AddTeacher from "../setup/AddTeacher"
import SchoolList from "../school/SchoolList"
import ClassList from "../class/ClassList"

export default class AdminLanding extends React.Component {

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

      console.log("Props on AdminLanding mount: ", this.props )
      console.log("State of AdminLanding component on mount: ", this.state)

      
    }


    render(){

      return (
        
        <div>

          <div>
          <h2> ADMIN LANDING PAGE </h2> 


          <div className="schoollist">
            <SchoolList
            currentUser={this.props.currentUser}
            // onUserChange = { userDoc => this.syncCurrentUser(userDoc) }
            ></SchoolList>
          </div>

          <div className="classlist">
            <ClassList
            currentUser={this.props.currentUser}
            // onUserChange = { userDoc => this.syncCurrentUser(userDoc) }
            ></ClassList>
          </div>


          </div>
                



        </div>


      )


    }




  }
