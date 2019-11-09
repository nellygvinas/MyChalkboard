import React from "react";
import axios from "axios";
// import { Switch, Route, NavLink, Link } from "react-router-dom";

export default class AddTeacher extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      teacher: null,
      teacherId: null,
      allUsers: null,
      visibleUsers: null,
      searchTerm: "",
      // schoolName: this.props.location.state.schoolName,
      // schoolId: this.props.location.state.schoolId,
      classCode: null,
      creator: "",
      image: "",
      parents: "",
      message: null,
      classAdded: false
      }
    }


    componentDidMount (){

      axios.get(`${process.env.REACT_APP_API_URL}/getusers`, { withCredentials: true })
      .then( responseFromTheBackend => {
        console.log("Users found: ", responseFromTheBackend.data.usersFound)
        this.setState({ allUsers: responseFromTheBackend.data.usersFound });

        })
      .catch(err => console.log("Err while searching for teacher: ", err))

    }

  
    search = (e) =>{
      
      this.setState({searchTerm: e.target.value }, ()=>{
  
      
        let clone = [...this.state.allUsers];
        
        let filteredUsers = this.state.allUsers.filter((eachUser)=>{
          console.log("eachUser is:", eachUser)
        return eachUser.fullName.toUpperCase().includes(this.state.searchTerm.toUpperCase())
  
      })
          this.setState({visibleUsers: filteredUsers})
      })
    }


    showFoundUsers = () =>{

      return this.state.visibleUsers.map((eachUser, i)=>{
  
        return( 
        
        <div>  
        <label>User: </label> {eachUser.fullName}

        <button> Add as Teacher </button>

        </div>  
    
        )
  
      })
  
    }



    render(){

      return (
        <div>

        <h4 className="title"> Add Teacher</h4>
        <label>Search for Teacher:</label><input onChange={this.search}
         value={this.state.searchTerm}>
        </input>

         {this.state.visibleUsers && <div>

          <h4>Found users:</h4> 
          {this.showFoundUsers()}
         </div>}


        </div>


      )


    }




  }
