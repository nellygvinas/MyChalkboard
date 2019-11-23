import React from "react";
// import axios from "axios";
import { 
  // Switch, Route, NavLink, 
  Link } from "react-router-dom";
// import ClassBox from "./ClassBox"


export default class ClassList extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      classId: "",
      allClasses: this.props.allClasses,
      visibleClasses: null,
      schools: [],
      message: null,
      showTeacherSchools: false,
    }
  }


    componentDidMount(){

      console.log("Props on ClassList mount: ", this.props )
      console.log("State of ClassList component on mount: ", this.state)

      // axios.get(`${process.env.REACT_APP_API_URL}/getclasses/`+this.props.currentUser._id,{ withCredentials: true })
      // .then( responseFromTheBackend => {
      //   console.log("Classes found: ", responseFromTheBackend.data.classesFound)
      //   this.setState({ allClasses: responseFromTheBackend.data.classesFound, showTeacherSchools: true }, () => {
      //     console.log("State after classes Found:", this.state)}
      //     );

      //   })
      // .catch(err => console.log("Err while searching for classes: ", err))
    }


    showFoundClasses = () =>{

      console.log("show found classes function")
      
      return this.state.allClasses.map((eachClass, index)=>{
  
        return( 
        
        <div key={index}>  
        <div>
        <label>Class: </label> {eachClass.className}
        </div>
        <div>
        <label>Teacher: </label> {eachClass.teacher.teacherName}
        </div>
        <div>

           {/* /class/details/:classlId */}

           <ul> 
            <Link to={{
            pathname: `/class/details/`+eachClass._id,
            state: {
              currentUser: {
                userId: this.props.currentUser._id,
                fullName: this.props.currentUser.fullName,
                email: this.props.currentUser.email,
                role: this.props.currentUser.role
              },
                classId: eachClass._id,
                className: eachClass.className,
                classCode: eachClass.classCode,
                teacherName: eachClass.teacher.teacherName,
                teacherId: eachClass.teacher.teacherId,
                schoolName: eachClass.schoolName,
                schoolId: eachClass.schoolId,
                creator: eachClass.creator,
                parents: eachClass.parents
             }
           }}> View Class </Link>
          </ul>




        </div>

        </div>  
    
        )
  
      })
  
    }


    showTeacherSchools = () =>{

      console.log("show schools for teacher")
      
      return this.state.allClasses.map((eachClass, index)=>{
  
        this.state.schools.push(eachClass.schoolName)

        return( 
        
        <div key={index}>  
        <div>
        <label>School: </label> {eachClass.schoolName}
        </div>

        </div>  
    
        )
  
      })
  
    }





    render(){



      return (
        
        <div>

          <div>
          <h4>YOUR CLASSES COMPONENT </h4> 
            
          </div>

          {!this.state.allClasses || this.state.allClasses.length === 0 && <div>

          <h3>Add a Class to a School to get Started</h3>

          
          </div>}


         {this.state.allClasses && <div> {this.showFoundClasses()} </div>}    

         {this.state.showTeacherSchools && <div>
           
           Classes for teacher
           
           {this.showTeacherSchools()}
           
           </div>}



        </div>


      )


    }




  }
