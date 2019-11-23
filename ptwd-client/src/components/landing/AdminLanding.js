import React from "react";
import axios from "axios";
import { Switch, Route, Nav, NavLink, Link } from "react-router-dom";
// import AddTeacher from "../setup/AddTeacher"
import SchoolList from "../school/SchoolList"
import ClassList from "../class/ClassList"
import Posting from "../posts/Posting"
import File from "../files/File"
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

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
      allClasses: this.props.allClasses,
      activeTab: props.activeTab || 1
    }
    this.handleSelect = this.handleSelect.bind(this);
   }


    componentDidMount(){

      console.log("Props on AdminLanding mount: ", this.props )
      console.log("State of AdminLanding component on mount: ", this.state)
      
    }

    handleSelect(selectedTab) {
      // The active tab must be set into the state so that
      // the Tabs component knows about the change and re-renders.
      this.setState({
        activeTab: selectedTab
      });
    }
   


    render() {

      return (
        
        <div className="page-landing">

          <div className="container side-bar" id="sidebar">
          
          <div className="row justify-content-start">
          <div className="col-sm align-self-center schoollist">
            <SchoolList
            currentUser={this.props.currentUser}
            allClasses={this.props.allClasses}
            // onUserChange = { userDoc => this.syncCurrentUser(userDoc) }
            ></SchoolList>
          </div>
          </div>

          <div className="row justify-content-start">
          <div className="col-sm align-self-center classlist">
            <ClassList
            currentUser={this.props.currentUser}
            allClasses={this.props.allClasses}
            // onUserChange = { userDoc => this.syncCurrentUser(userDoc) }
            ></ClassList>
          </div>
          </div>

          </div>

          <div class ="tab-container">
          <Tabs activeKey={this.state.activeTab} onSelect={this.handleSelect}>
            <Tab eventKey={1} title="Story">
            <Posting activeTab={1}
            allClasses={this.state.allClasses}
            currentUser={this.props.currentUser}
            // classId={this.props.classId} 
            />
            </Tab>

            <Tab eventKey={2} title="Files">
            <File activeTab={2}
            currentUser={this.props.currentUser}
            allClasses={this.state.allClasses}>
            </File>
            </Tab>
          </Tabs>
          </div>
        </div>

      )
      }

    }
