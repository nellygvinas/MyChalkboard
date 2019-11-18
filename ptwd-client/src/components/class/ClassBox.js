import React from "react";
import axios from "axios";
// import { Switch, Route, NavLink, Link } from "react-router-dom";
import AddTeacher from "../setup/AddTeacher"

export default class ClassBox extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      currentUser: this.props.location.state.currentUser,
      classId: this.props.location.state.classId,
      className: this.props.location.state.className,
      teacher: {
        teacherName: this.props.location.state.teacherName,
        teacherId: this.props.location.state.teacherId},
      teacherAdded: false,
      schoolName: this.props.location.state.schoolName,
      schoolId: this.props.location.state.schoolId,
      classCode: this.props.location.state.classCode,
      creator: this.props.location.state.creator,
      parents: this.props.location.state.parents,
      showEditButton: false,
      showEditForm: false

    }
  }


    componentDidMount(){

      console.log("Props on ClassBox mount: ", this.props )
      console.log("State of ClassBox component on mount: ", this.state)

      if (this.state.currentUser.role == "Admin" || this.state.currentUser.role == "Teacher") {
        this.setState({showEditButton:true}, () => {console.log("State after edit form condition:", this.state)}
          )
        }

    }

  
    syncCurrentTeacher(teacherData){
      console.log("Teacher data passed to synccurrentteacher", teacherData)
      this.setState({ teacher: {teacherName: teacherData.teacherName, teacherId: teacherData.teacherId}  })
    }
  

    toggleEditForm = () =>{
      this.setState({showEditForm: !this.state.showEditForm})
    }


    render(){

      return (
        
        <div>

          <div>
          <h3>Class Name: </h3> 
            <h4>{this.state.className}</h4>
          </div>
                
          <div>
            <label>Class Code: </label> 
              {this.state.classCode}
          </div>
                
        <div>
                  
          <label>Class Teacher: </label> 

          {/* If no teacher is assigned, and user is Admin or Teacher, allow view of assign teacher */}
          {!this.state.teacher.teacherName && <div> {!this.state.teacher.teacherName} 
           No Teacher Assigned 
                  
           {this.state.showEditButton && <div>
            <AddTeacher
            onTeacherChange = { teacherDoc => this.syncCurrentTeacher(teacherDoc) }
            classId = {this.state.classId}/>
            </div>}
           
            </div>}

          {/* If teacher is assigned, show their name.  */}
            {this.state.teacher.teacherName}
        
         </div>

         <div>
            <label>Parents: </label> 
              {this.state.parents}
          </div>

        <div>

          {/* If teacher is assigned anduser is Admin or Teacher, allow these components to be seen */}
          {this.state.showEditButton && <div>
            
            <button onClick={this.toggleEditForm}>Edit Class</button>
            
            {this.state.showEditForm && <div>
            <AddTeacher onTeacherChange = { teacherDoc => this.syncCurrentTeacher(teacherDoc) }
            classId = {this.state.classId}/>
            </div>}
            
            </div>} 

        </div>

                
                      


      </div>


      )


    }




  }
