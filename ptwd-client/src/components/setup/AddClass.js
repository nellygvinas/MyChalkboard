import React from "react";
import axios from "axios";
import { Switch, Route, NavLink, Link } from "react-router-dom";
import ClassBox from "../class/ClassBox"

export default class AddClass extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      class: [],
      classCode: "",
      message: null,
      classCodeEntered: false
      }
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
      // const { name, value } = event.target;
      this.setState({ [event.target.name]: event.target.value });
      console.log("The state is", this.state)
    }


    handleSubmit (event){
      console.log("Form submitted");
      event.preventDefault();

      this.setState({ classCodeEntered: true });

      const formClassCode = this.state.classCode
      console.log("The state is", this.state.classCode)

      axios.get(
          // route we are hitting in the backend
          "http://localhost:3001/api/setup/class/code",
          // the data from the form (AKA req.body 🚀) that we are sending to this route to do the job
          formClassCode,
          // secure sending
          { withCredentials: true }
      )
      .then( responseFromServer => {
          console.log("Class found is:", responseFromServer.data);
          // const { classesDoc } = responseFromServer.data;

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
        <div>

         <h1>PLEASE ENTER YOUR CLASS CODE</h1> 

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
                  {this.state.class[0]}
                </div>
                  
                    
                </div> }
          


        </div>


      )

    }







}  // end of Class