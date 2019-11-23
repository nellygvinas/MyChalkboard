import React from "react";
import axios from "axios";
import { Switch, Route, NavLink, Link } from "react-router-dom";
import ClassBox from "../class/ClassBox"

export default class AddClass extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      currentUser: {
        userId: this.props.location.state.currentUser.userId,
        fullName: this.props.location.state.currentUser.fullName,
        email: this.props.location.state.currentUser.email,
        role: this.props.location.state.currentUser.role,
      },
      classCode: "",
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


    searchClasses = () =>{

      return this.state.visibleClasses.map((eachClass, i)=>{
  
        return(
          <ClassBox key={i} 
          className={eachClass.className}
          classCode={eachClass.classCode}
          theSchool={eachClass.schoolName}
           />
        )
  
      })
  
    }


    genericSync(event){
      console.log("Event Target Value: ", event.target.value)
      const { name, value } = event.target;
      this.setState({ [name]: value }, ()=>console.log("State while changing class code: ", this.state));
      
    }


    handleSubmit (event){
      console.log("Form submitted");
      event.preventDefault();

      this.setState({ classCodeEntered: true }, ()=>console.log("code entered ", this.state));

      axios.get(
          // route we are hitting in the backend
          `${process.env.REACT_APP_API_URL}/classinfo/`+this.state.classCode,
          // secure sending
          { withCredentials: true }
      )
      .then( responseFromServer => {
          console.log("Class found is:", responseFromServer.data);

          // this.setState({ class: classesDoc });
          
      })
      .catch( err => {
        console.log("Error while adding class: ", err)
        this.setState({ message: err });
        }
      );
  }


    render(){

      console.log(this.props)
      return (
        <div id="add-class">

         <h2>Please Enter your Class Code</h2> 

              <form onSubmit ={ event => this.handleSubmit(event) } >
            
                    <label> Class Code: </label>
                    <input
                        // value={schoolName} // this.state.schoolName
                        onChange = { event => this.genericSync(event) } 
                        type="text"
                        name="classCode"
                        placeholder="123XYZ"
                    />
        
                    <button> Submit Class Code </button>
                </form>

                {/* if the message is not null (basically if there's a message) then show it in this <div> tag */}
                { this.state.message && <div> { this.state.message } </div> }

                { this.state.classCodeEntered && <div> 
                
                <h3>Classes Found:</h3>

                <div>
                  
                </div>
                  
                    
                </div> }
          


        </div>


      )

    }







}  // end of Class