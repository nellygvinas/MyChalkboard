import React from "react";
import axios from "axios";
import { Switch, Route, NavLink, Link } from "react-router-dom";
import AddTeacher from "./AddTeacher"


export default class NewClass extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      className: "",
      teacher: null,
      teacherId: null,
      schoolName: this.props.location.state.schoolName,
      schoolId: this.props.location.state.schoolId,
      classCode: null,
      creator: "",
      image: "",
      parents: "",
      message: null,
      classAdded: false
      }
    }

    componentDidMount(){
      console.log("This is a new class");
      console.log("School props: ", this.props.location.state)
    }


    genericSync(event){
      console.log("The event.target is: ", event.target.value)
      const { name, value } = event.target;
      this.setState({ [name]: value });
    }

    handleSubmit (event){
      console.log("Form submitted. State is:", this.state);
      event.preventDefault();

        axios.post(
            // route we are hitting in the backend
            `${process.env.REACT_APP_API_URL}/setup/class`,
            // the data from the form (AKA req.body 🚀) that we are sending to this route to do the job
            this.state,
            // secure sending
            { withCredentials: true }
        )
        .then( responseFromServer => {
            console.log("Response from server after post for New Class is:", responseFromServer.data.newClass);
            this.setState({ classCode: responseFromServer.data.newClass.classCode, classAdded: true, 
              creator: responseFromServer.data.newClass.creator }, 
              () => {
                console.log("State after post, class added and creator assigned:", this.state)
            });
            
        })
        .catch( err => console.log("Err in class setup: ", err));
  }


    render(){

      // const teacherAdded = this.state.teacher;
      // let button;
      // console.log(teacherAdded)

      // if (!teacherAdded) {
      // <AddTeacher  />;
      // } else {
    
      // }

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

              {this.state.classAdded && <div>

                 <h3> You created a new class: </h3>
                  <div>
                    <label>Class Name: </label> 
                    {this.state.className}
                  </div>
                 
                  <div>
                    <label>Class Code: </label> 
                    {this.state.classCode}
                  </div>
                  
                  <div>
                    
                    <label>Class Teacher: </label> 
                    
                    {!this.state.teacher && <div> {!this.state.teacher}
                    No Teacher Assigned 
                    <AddTeacher>

                    </AddTeacher>
                    </div>}

                  </div>
                  
                
                </div> }
                
                
                {/* if the message is not null (basically if there's a message) then show it in this <div> tag */}
                { this.state.message && <div> { this.state.message } </div> }
          


        </div>    
        // end of containing div


      )

    }












}