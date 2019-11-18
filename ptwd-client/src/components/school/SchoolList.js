import React from "react";
import axios from "axios";
import NewSchool from "../setup/NewSchool";
import { Switch, Route, NavLink, Link } from "react-router-dom";


export default class SchoolList extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      currentUser: {
        userId: this.props.currentUser.userId,
        fullName: this.props.currentUser.fullName,
        email: this.props.currentUser.email,
        role: this.props.currentUser.role
        },
      schoolId: "",
      allSchools: null,
      visibleSchools: null,
      message: null
    }
  }


    componentDidMount(){

      console.log("Props on SchoolList mount: ", this.props )
      console.log("State of SchoolList component on mount: ", this.state)

      axios.get(`${process.env.REACT_APP_API_URL}/getschools/`+this.props.currentUser._id, { withCredentials: true })
      .then( responseFromTheBackend => {
        console.log("Schools found: ", responseFromTheBackend.data.schoolsFound)
        this.setState({ allSchools: responseFromTheBackend.data.schoolsFound }, () => {
          console.log("State after schools Found:", this.state)}
          );

        })
      .catch(err => console.log("Err while searching for teacher: ", err))
    }


    showFoundSchools = () =>{


      return this.state.allSchools.map((eachSchool, index)=>{
  
      
        return( 
        
        <div key={index}>  
        <div>
        <label>School: </label> {eachSchool.schoolName}
        
        
        </div>
        <div>
        <label>School Address: </label> {eachSchool.address}, {eachSchool.city}, {eachSchool.state}
        </div>
        <div>

          <ul> 
          <Link to={{
            pathname: `/school/details/`+eachSchool._id,
            state: {
              currentUser: {
                userId: this.props.currentUser._id,
                fullName: this.props.currentUser.fullName,
                email: this.props.currentUser.email,
                role: this.props.currentUser.role
              },
              schoolId: eachSchool._id,
              schoolName: eachSchool.schoolName,
              address: eachSchool.address,
              city: eachSchool.city,
              state: eachSchool.state,
              zip: eachSchool.zip
             }
           }}> Edit School </Link>
          </ul>
          
          <ul>

          <Link to={{
            pathname: `/setup/class`,
            state: {
              currentUser: {
                userId: this.props.currentUser._id,
                fullName: this.props.currentUser.fullName,
                email: this.props.currentUser.email,
                role: this.props.currentUser.role
              },
              schoolId: eachSchool._id,
              schoolName: eachSchool.schoolName,
              address: eachSchool.address,
              city: eachSchool.city,
              state: eachSchool.state,
              zip: eachSchool.zip
             }
           }}> Add class </Link>
          </ul>

        
        </div>

        </div>  
    
        )
  
      })
  
    }


    render(){

      return (
        
        <div>

          <div>
          <h4>YOUR SCHOOLS COMPONENT </h4> 
            
          </div>

        {!this.state.allSchools || this.state.allSchools.length == 0 && <div>

        <h3>Add School to get started</h3>

        <Link to={{
            pathname: '/setup/admin',
            state: {
              currentUser: {
                userId: this.props.currentUser._id,
                fullName: this.props.currentUser.fullName,
                email: this.props.currentUser.email,
                role: "Admin"
              }
            }}
            }> Add School </Link>

        </div>}


         {this.state.allSchools && <div> {this.showFoundSchools()} </div>}    



        </div>


      )


    }




  }
