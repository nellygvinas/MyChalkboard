import React from "react";
import axios from "axios";
import { Switch, Route, NavLink, Link } from "react-router-dom";
import AddTeacher from "./AddTeacher"
import ClassBox from "../class/ClassBox"


export default class FindClass extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      classId: "",
      className: "",
      teacher: {teacherName: null,
      teacherId: null},
      schoolName: "",
      schoolId: "",
      classCode: null,
      creator: "",
      image: "",
      parents: [],
      message: null,
      classAdded: false
      }
    }

    componentDidMount(){
      console.log("Find class component");
      
    }


    genericSync(event){
      console.log("The event.target is: ", event.target.value)
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
              

              this.setState({ classId: responseForGetClass.data.classFound._id, classCode: responseForGetClass.data.classFound.classCode, classAdded: true, 
              creator: responseForGetClass.data.classFound.creator }, 
              () => {
                console.log("State after post, class added and creator assigned:", this.state)
            });

              })
            .catch(err => console.log("Err while searching for class: ", err))





        })
        .catch( err => console.log("Err in class setup: ", err));
  }



    syncCurrentTeacher(teacherData){
      this.setState({ teacher: teacherData })
    }




    render(){


      return (
        <div>

          <div>

          <h4 className="title"> Find School or Class</h4>
          <label>Search:</label><input onChange={this.search}
          value={this.state.searchTerm}>
          </input>

          {this.state.visibleUsers && <div>

            <h4>Found users:</h4> 
            {this.showFoundUsers()}
          </div>}


          </div>
                
                
                {/* if the message is not null (basically if there's a message) then show it in this <div> tag */}
                { this.state.message && <div> { this.state.message } </div> }
          


        </div>    
        // end of containing div


      )

    }








}