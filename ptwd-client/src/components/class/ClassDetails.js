import React from "react";
import axios from "axios";
// import { Switch, Route, NavLink, Link } from "react-router-dom";
import AddTeacher from "../setup/AddTeacher"

export default class ClassDetails extends React.Component {

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

      console.log("Props on ClassDetails mount: ", this.props )
      console.log("State of ClassDetails component on mount: ", this.state)

      if (this.state.currentUser.role === "Admin" || this.state.currentUser.role === "Teacher") {
        this.setState({showEditButton:true}, () => {console.log("State after edit form condition:", this.state)}
          )
        }
    }

    genericSync(event){
      // console.log("what is: ", event.target.value)
      const { name, value } = event.target;
      this.setState({ [name]: value });
    }

  
    syncCurrentTeacher(teacherData){
      console.log("Teacher data passed to synccurrentteacher", teacherData)
      this.setState({ teacher: {teacherName: teacherData.teacherName, teacherId: teacherData.teacherId}  })
    }
  

    toggleEditForm = () =>{
      this.setState({showEditForm: !this.state.showEditForm})
    }


    updateClass(event){

      event.preventDefault();

        axios.put(
            // route we are hitting in the backend
            `${process.env.REACT_APP_API_URL}/class/update/`+this.state.classId,
            // the data from the form (AKA req.body 🚀) that we are sending to this route to do the job
            this.state,
            // secure sending
            { withCredentials: true }
        )
        .then( responseFromServer => {
            
          
          axios.get(`${process.env.REACT_APP_API_URL}/classinfo/`+this.state.classId, { withCredentials: true })
          .then( updatedClass => {
            console.log("Class found after edit: ", updatedClass.data.classFound)
            

            this.setState({ className: updatedClass.data.classFound.className }, () => {
              console.log("State after updates:", this.state)}
              );  
    
            })
          .catch(err => console.log("Err while searching for class: ", err))
            
        })
        .catch( err => console.log("Err in class update: ", err));

        this.toggleEditForm()
    }





    render(){

      return (
        
        <div id="class-details">

          <div>
          <h3>Class Name: </h3><span>  </span>  
            <h4>{this.state.className}</h4>
          </div>
                
          <div>
            <label>Class Code: </label><span>  </span> 
              {this.state.classCode}
          </div>
                
        <div>
                  
          <label>Class Teacher: </label> 

          {/* If no teacher is assigned, and user is Admin or Teacher, allow view of assign teacher */}
          {!this.state.teacher.teacherName && <div> {!this.state.teacher.teacherName} 
           <p>No Teacher Assigned </p>
                  
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
          {this.state.teacher.teacherName && this.state.showEditButton && <div>
            
            <button onClick={this.toggleEditForm}>Edit Class</button>
            
            {this.state.showEditForm && <div>
            
            <form onSubmit = {event => this.updateClass(event)} >                    
             
             <h3>Edit Class Details</h3>

             <label> Class Name: </label>
             <input
                 value={this.state.className} // this.state.fullName
                 onChange = { event => this.genericSync(event) } 
                 type="text"
                 name="className"
                 placeholder={this.state.className}
             />
                       
               <button> Update Name </button>

           </form>
            
           <AddTeacher onTeacherChange = { teacherDoc => this.syncCurrentTeacher(teacherDoc) }
            classId = {this.state.classId}/>
            
            
            
            </div>} 
              {/* End of show form on showform state */}

            </div>} 

        </div>

                
                      


      </div>


      )


    }




  }
