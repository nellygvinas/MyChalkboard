import React from "react";
import axios from "axios";
import { Switch, Route, NavLink, Link } from "react-router-dom";
import AddTeacher from "./AddTeacher"
import ClassBox from "../class/ClassBox"


export default class NewClass extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      currentUser: this.props.location.state.currentUser,
      classId: null,
      className: "",
      teacher: {teacherName: null,
      teacherId: null},
      schoolName: this.props.location.state.schoolName,
      schoolId: this.props.location.state.schoolId,
      classCode: null,
      creator: "",
      image: "",
      parents: [],
      message: null,
      classAdded: false
      }
    }

    componentDidMount(){
      console.log("Props from new class component on mount: ", this.props)
    }


    syncCurrentTeacher(teacherData){
      this.setState({ teacher: teacherData })
    }



    genericSync(event){
      // console.log("The event.target is: ", event.target.value)
      const { name, value } = event.target;
      this.setState({ [name]: value });
    }

    handleSubmit (event){
      event.preventDefault();
      console.log("Form submitted. State is:", this.state);

        axios.post(
            // route we are hitting in the backend
            `${process.env.REACT_APP_API_URL}/setup/class`,
            // the data from the form (AKA req.body 🚀) that we are sending to this route to do the job
            this.state,
            // secure sending
            { withCredentials: true }
        )
        .then( responseFromServer => {

            let newClassId = responseFromServer.data.newClass._id

            axios.get(`${process.env.REACT_APP_API_URL}/classinfo/`+newClassId, { withCredentials: true })
            .then( responseForGetClass => {
              console.log("Class found: ", responseForGetClass.data)
              

              this.setState({ classId: responseForGetClass.data.classFound._id, classCode: responseForGetClass.data.classFound.classCode, 
              creator: responseForGetClass.data.classFound.creator }, 
              () => {
                console.log("State after post, class added and creator assigned:", this.state)
              })

              })
            .catch(err => console.log("Err while searching for class: ", err))

        })
        .catch( err => console.log("Err in class setup: ", err));
        
        this.setState({ classAdded: true}, 
          () => {
            console.log("State after post, class added and creator assigned:", this.state)
          })

    }
    // end of handle submit




    render(){


      return (
        <div>

         <h1>CREATE A NEW CLASS</h1> 

              <form onSubmit ={ event => this.handleSubmit(event) } >
            
                    <label> Class Name: </label>
                    <input
                        // value={schoolName} // this.state.schoolName
                        onChange = { event => this.genericSync(event) } 
                        type="text"
                        name="className"
                        placeholder="Mr. Smith's Homeroom "
                    />

                    <button> Create Class </button>
              </form>

              {this.state.classAdded && this.state.classId && <div><h3> Your class: </h3>
                  
                <ClassBox 
                  currentUser = {this.props.location.state.currentUser}
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
          


        </div>    
        // end of containing div

      )

    }




}