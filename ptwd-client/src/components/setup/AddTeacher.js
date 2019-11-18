import React from "react";
import axios from "axios";
// import { Switch, Route, NavLink, Link } from "react-router-dom";

export default class AddTeacher extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      classId: this.props.classId,
      teacher: {teacherName: null,
        teacherId: null},
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

      console.log("Props on addTeacher mount: ", this.props )
      console.log("state of addTeacher component on mount: ", this.state)

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

    addTeacher(teacherItem){
      
      console.log("item passed to addTeacher function: ", teacherItem)
      
      this.setState({ teacher: {
            teacherName: teacherItem.fullName, 
            teacherId: teacherItem._id
          }
        }, () => {
            console.log("State after post, teacher and id added:", this.state);
          

            axios.put(`${process.env.REACT_APP_API_URL}/classinfo/`+this.state.classId, this.state.teacher, { withCredentials: true })
            .then( responseForUpdateClass => {
              console.log("Class updated in ClassBox: ", responseForUpdateClass.data)
            

              axios.get(`${process.env.REACT_APP_API_URL}/classinfo/`+this.state.classId, { withCredentials: true })
              .then( responseForGetClass => {
              console.log("Updated Class found: ", responseForGetClass.data)
              

              this.setState({ teacher: {
              teacherName: responseForGetClass.data.classFound.teacher.teacherName, 
              teacherId: responseForGetClass.data.classFound.teacher.teacherId
              }}, () => {
              console.log("State after getting updated class:", this.state);


              const teacherDoc = responseForGetClass.data.classFound.teacher;
              console.log("teacherDoc from addTeacher component:", teacherDoc);
              this.props.onTeacherChange(teacherDoc);

              })

            })
            .catch(err => console.log("Err while searching for class: ", err))




            })
            .catch(err => console.log("Err while updating class: ", err))
          
          
          
          
          
          
          
          
          }) 


          


    
      
      

    }
      
    

    showFoundUsers = () =>{

      return this.state.visibleUsers.map((eachUser, i)=>{
  
        return( 
        
        <div>  
        <label>User: </label> {eachUser.fullName}

        <button onClick={() => this.addTeacher(eachUser)}> Assign Teacher </button>

        </div>  
    
        )
  
      })
  
    }

   


    render(){

      return (
        <div>

        <h4 className="title"> Assign Teacher</h4>
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
