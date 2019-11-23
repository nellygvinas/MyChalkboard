import React from "react";
import axios from "axios";
// import { Switch, Route, NavLink, Link } from "react-router-dom";

export default class SchoolBox extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      // currentUser: {
      //   userId: this.props.location.state.currentUser.userId,
      //   fullName: this.props.location.state.currentUser.fullName,
      //   email: this.props.location.state.currentUser.email,
      //   role: this.props.location.state.currentUser.role
      //   },
      schoolId: this.props.location.state.schoolId,
      schoolName: this.props.location.state.schoolName,
      address: this.props.location.state.address,
      city: this.props.location.state.city,
      state: this.props.location.state.state,
      zip: this.props.location.state.zip,
      showEditForm: false,
      message: null
    }
  }


    componentDidMount(){
      console.log("Props on SchoolBox mount: ", this.props )
      console.log("State of SchoolBox component on mount: ", this.state)
    }


    genericSync(event){
      // console.log("what is: ", event.target.value)
      const { name, value } = event.target;
      this.setState({ [name]: value });
    }


    toggleEditForm = () =>{
      this.setState({showEditForm: !this.state.showEditForm})
    }
  
    updateSchool(event){

      event.preventDefault();

        axios.put(
            // route we are hitting in the backend
            `${process.env.REACT_APP_API_URL}/school/update/`+this.state.schoolId,
            // the data from the form (AKA req.body 🚀) that we are sending to this route to do the job
            this.state,
            // secure sending
            { withCredentials: true }
        )
        .then( responseFromServer => {
            
          
          axios.get(`${process.env.REACT_APP_API_URL}/schoolinfo/`+this.state.schoolId, { withCredentials: true })
          .then( updatedSchool => {
            console.log("School found after edit: ", updatedSchool.data.schoolFound)
            

            this.setState({ schoolName: updatedSchool.data.schoolFound.schoolName }, () => {
              console.log("State after updates:", this.state)}
              );  


    
            })
          .catch(err => console.log("Err while searching for school: ", err))
            
        })
        .catch( err => console.log("Err in school update: ", err));

        this.toggleEditForm()
    }


    deleteSchool(event){
      
      window.confirm("Please confirm that you wish to delete this school before proceeding. All school data and classes will be removed.")
      
      event.preventDefault();
      
      axios.post(`${process.env.REACT_APP_API_URL}/school/delete/`+this.state.schoolId, { withCredentials: true })
      .then( responseFromServer => {
        
        let deletedSchoolId = responseFromServer.data.deletedSchool._id
        console.log("School deleted: ", responseFromServer.data.deletedSchool)   

        this.setState({message: "The school and all associated data have been removed."})


        axios.post(`${process.env.REACT_APP_API_URL}/classes/delete/`+deletedSchoolId, { withCredentials: true })
        .then( responseAfterClasses => {
        
          console.log("Classes found for school: ", responseAfterClasses.data.foundClasses)
          console.log("Classes deleted: ", responseAfterClasses.data.deletedClasses)   

         let classesArray = responseAfterClasses.data.foundClasses

         return classesArray.map((eachClass, index)=>{
              
              return axios.post(`${process.env.REACT_APP_API_URL}/postings/delete/`+eachClass._id, { withCredentials: true })
              .then( responseAfterClasses => {
            
              console.log("Postings found for deleted classes: ", responseAfterClasses.data.foundPosts)
              console.log("Postings deleted: ", responseAfterClasses.data.deletedPosts)   
  
                })
              .catch( err => console.log("Err in delete: ", err))

              })

              })
              .catch( err => console.log("Err in delete: ", err))
              })
            .catch( err => console.log("Err in delete: ", err))

   }





    render(){

      return (
        
        <div>

          <h2> {this.state.schoolName} </h2>

          <div>
          <label>School Address: </label>{this.state.address}
          </div>

          <div>
          <label>City: </label> {this.state.city}
          </div>

          <div>
          <label>State: </label>{this.state.state}
          </div>

          <div>
          <label>School Zip: </label>{this.state.zip}
          </div>

          <div>
          <button onClick={this.toggleEditForm}>Edit School</button>  
          </div>

          <div>
          <button onClick={event => this.deleteSchool(event)}>Delete School</button>
          </div>

          {this.state.showEditForm && 
          <section>
            <h2> Edit Details for {this.state.schoolName} </h2>
            
            <form onSubmit = {event => this.updateSchool(event)} >                    
             
              <label> School: </label>
              <input
                  value={this.state.schoolName} // this.state.fullName
                  onChange = { event => this.genericSync(event) } 
                  type="text"
                  name="schoolName"
                  placeholder={this.state.fullName}
              />
                        
                <label> Address: </label>
                <input
                    value={this.state.address} // this.state.email
                    onChange = { event => this.genericSync(event) } 
                    type="text"
                    name="address"
                    placeholder={this.state.address}
                />

                <label> City </label>
                
                <input
                    value={this.state.city} // this.state.password
                    onChange = { event => this.genericSync(event) } 
                    type="text"
                    name="city"
                    placeholder={this.state.city}
                />

                <input
                    value={this.state.state} // this.state.password
                    onChange = { event => this.genericSync(event) } 
                    type="text"
                    name="state"
                    placeholder={this.state.state}
                />

                <input
                    value={this.state.zip} // this.state.password
                    onChange = { event => this.genericSync(event) } 
                    type="text"
                    name="zip"
                    placeholder={this.state.zip}
                />

                <button> Update School Details </button>
            </form>

            {/* if the message is not null (basically if there's a message) then show it in this <div> tag */}
        
        </section>}

            { this.state.message && <div> { this.state.message } </div> }

            
      

                  
                
                      


        </div>


      )


    }




  }
