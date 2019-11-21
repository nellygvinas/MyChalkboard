import React from "react";
import axios from "axios";
import { Switch, Route, NavLink, Link } from "react-router-dom";
import AddTeacher from "./AddTeacher"
import ClassBox from "../class/ClassBox"


export default class FindClass extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      currentUser: {
        userId: this.props.location.state.currentUser.userId,
        fullName: this.props.location.state.currentUser.fullName,
        email: this.props.location.state.currentUser.email,
        role: this.props.location.state.currentUser.role,
      },
      classCode: null,
      classFound: false,
      classId: "",
      className: "",
      teacher: {
        teacherName: null,
        teacherId: null
      },
      schoolName: "",
      schoolId: "",
      creator: "",
      image: "",
      parents: [],
      message: null
      }
    }

    componentDidMount(){
      console.log("Props - Find class component on mount: ", this.props);
      console.log("state on find class component on mount:", this.state)

      axios.put(
        // route we are hitting in the backend
        `${process.env.REACT_APP_API_URL}/setup/role`,
        // the data from the form (AKA req.body 🚀) that we are sending to this route to do the job
        this.state.currentUser,
        // secure sending
        { withCredentials: true }
      )
      .then( responseFromServer => {
          console.log("Response from server after role post is:", responseFromServer.data);
      
          axios.get(`${process.env.REACT_APP_API_URL}/setup/role/`+this.state.currentUser.userId, { withCredentials: true })
          .then( responseFromTheBackend => {
            console.log("User found after role assigned: ", responseFromTheBackend.data.theUpdatedUser)
            this.setState({ currentUser: {role: responseFromTheBackend.data.theUpdatedUser }}, () => {
              console.log("State after role assigned:", this.state)}
              );
    
            })
          .catch(err => console.log("Err while searching for teacher: ", err))
      
      })
      .catch( err => console.log("Err in role setup: ", err)); 



    }


    genericSync(event){
      console.log("The event.target is: ", event.target.value)
      const { name, value } = event.target;
      this.setState({ [name]: value }, ()=>console.log("State as changing: ", this.state));
    }

    findClass (event){
      event.preventDefault();
      event.target.value = "";

      console.log("Form for findclass submitted. State is:", this.state);

        axios.get(
            // route we are hitting in the backend
            `${process.env.REACT_APP_API_URL}/classinfo/code/`+this.state.classCode,
            // secure sending
            { withCredentials: true }
        )
        .then( responseFromServer => {

           
              console.log("Class found: ", responseFromServer.data)
              

              this.setState({ 
                classCode: responseFromServer.data.classFound.classCode, 
                classFound: true,
                classId: responseFromServer.data.classFound._id, 
                className: responseFromServer.data.classFound.className,
                teacher: {
                  teacherName: responseFromServer.data.classFound.teacher.teacherName,
                  teacherId: responseFromServer.data.classFound.teacher.teacherId
                },
                schoolName: responseFromServer.data.classFound.schoolName,
                schoolId: responseFromServer.data.classFound.schoolId,
                creator: responseFromServer.data.classFound.creator,
                image: "",
                parents: responseFromServer.data.classFound.parents,
                message: null
              }, 
              () => {
                console.log("State after class found:", this.state)
              })
            })
        .catch( err => console.log("Err in class find ", err));

        
        }



    syncCurrentTeacher(teacherData){
      this.setState({ teacher: teacherData })
    }




    render(){


      return (
        <div>

  

          <h4 className="title"> Find Class</h4>
          <label>Search by class code to add yourself as teacher.</label>
          
          <form onSubmit = {event => this.findClass(event)} >  

            <input
                //  value={this.state.classCode} // this.state.fullName
                 onChange = { event => this.genericSync(event) } 
                 type="text"
                 name="classCode"
                 placeholder="Your class code"
             />


          <button>Find class </button>
          </form>

          

            <h4>Found class:</h4> 
           
            {this.state.classFound && <div>

              <ClassBox 
                  currentUser = {this.state.currentUser}
                  classId ={this.state.classId}
                  className = {this.state.className}
                  classCode = {this.state.classCode}
                  teacherName = {this.state.teacher.teacherName}
                  teacherId = {this.state.teacher.teacherId}
                  schoolName = {this.state.schoolName}
                  schoolId = {this.state.schoolId}
                  creator = {this.state.creator}
                  parents = {this.state.parents}
                  />
                  
              
            </div>}

          
                
                
                {/* if the message is not null (basically if there's a message) then show it in this <div> tag */}
                { this.state.message && <div> { this.state.message } </div> }
          


        {/* end of containing div */}
        
        </div>    


      )

    }








}