import React from "react";
import axios from "axios";
// import { Switch, Route, NavLink, Link } from "react-router-dom";
// import AddTeacher from "../setup/AddTeacher"
// import SchoolList from "../school/SchoolList"
import ClassList from "../class/ClassList"
import Posting from "../posts/Posting"
import update from 'immutability-helper';



export default class File extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      classId: "",
      className: "",
      teacher: {
        teacherName: "",
        teacherId: ""},
      schoolName: "",
      schoolId: "",
      classCode: "",
      creator: "",
      creation: "",
      parents: [],
      name: "",
      fileId: "",
      fileLocation: "",
      files: null,
      allFiles: [],
      allClasses: this.props.allClasses,
    }
  }


    componentDidMount(){

      console.log("Props on File component mount: ", this.props )
      console.log("State of File component on mount: ", this.state)

      return this.state.allClasses.map((eachClass, index)=>{

        axios.get(`${process.env.REACT_APP_API_URL}/files/`+eachClass._id, { withCredentials: true })
        .then( filesFound => {
          
          console.log("Files found for class Id: ", filesFound.data)
          
          this.setState({ allFiles: [...filesFound.data.theFiles ] }, () => {
            console.log("State after updates:", this.state)}
            );  

          // this.setState({ myArray: [...this.state.myArray, ...[1,2,3] ] })

          })
        .catch(err => console.log("Err while searching for class: ", err))

     })
      
    }


    genericSync(event){
      // console.log("what is: ", event.target.value)
      const { name, value } = event.target;
      this.setState({ [name]: value }, ()=> {console.log("state after changes", this.state)});
    }

    selectChange(event){
      console.log("what is: ", event.target.value)
      let value = event.target.value;
      this.setState({ class: value }, ()=> {console.log("state after class selected", this.state)});
    }

    handleFiles(event){
      this.setState({
        files: event.target.files,
       }, ()=> {console.log("state after files uploaded", this.state)})
    }


    createDocument(event){

      event.preventDefault();
      const formData = new FormData();
      
      for(let i = 0, numFiles = this.state.files.length; i < numFiles; i++) {
      let file = this.state.files[i]   
       formData.append('file', this.state.files[i])
       }
    
      formData.append('creation', this.state.creation)
      formData.append('description', this.state.description)
      
      axios.post(
        // route we are hitting in the backend
        `${process.env.REACT_APP_API_URL}/landing/file/`+this.state.class,
        // the data from the form (AKA req.body 🚀) that we are sending to this route to do the job
        formData,
        // secure sending
        { withCredentials: true }
      )
      .then( responseFromServer => {
        
         console.log("New file created: ", responseFromServer.data.newFile)
         
 
          axios.get(`${process.env.REACT_APP_API_URL}/landing/file/`+responseFromServer.data.newFile._id, { withCredentials: true })
          .then( addedFile => {
           
            console.log("File created is: ", addedFile.data.theFile)
            

            this.setState({ fileId: addedFile.data.theFile._id }, ()=>{console.log("state after new post created: ", this.state)})


            this.setState({
             allFiles: update(this.state.allFiles, {$unshift: [addedFile.data.theFile]}
            )}, ()=> {console.log("update to postings: ", this.state)})

              

            })
          .catch(err => console.log("Err while searching for class: ", err))
            
      })
      .catch( err => console.log("Err in class update: ", err));

    }


    renderFiles(files){
              
      return files.map((file,index) => {
        return  <iframe key={index} title={index} src={file} width="50%" height="100px"/>
    
     });

    }


    showFiles(){
      
      return this.state.allFiles.map((eachFile, index)=>{
  
        return( 

        <div key={index}>
          {eachFile.creator.fullName}
          <br/>
          {eachFile.class.className}
          <br/>
          {this.renderFiles(eachFile.files)}
          <br/>
          {eachFile.description}
          <br/>
         
        </div>
        )
  
      })

    }



    showClassesForPost(){
      return this.state.allClasses.map((eachClass, index)=>{
  
        return( 
        
          <option key={index} name="class" value={eachClass._id}>{eachClass.className}</option>

        )
  
      })
    }


    render(){

      return (
        
        <div>

          <div>
          <h2> Class Documents </h2> 
          </div>


          Add a New File
          <br/>

          <form onSubmit={event => this.createDocument(event)} id="documentform" encType="multipart/form-data">
              
              <label for="class">Select class:</label>
              <select onChange={event => this.selectChange(event)}>
                <option name="class" value=" ">Select a Class</option>
                {this.showClassesForPost()}
              </select>
              <br/>
              
              <label for="creation">Date:</label>
              <input 
                type="date" name="creation" 
                placeholder="Date" 
                onChange = {event => this.genericSync(event)} 
                value={this.state.creation} /> 
                
              <br/>

              <label for="description">Description:</label>
              <input 
                type="text" 
                name="description" 
                placeholder="Subject" 
                onChange = {event => this.genericSync(event)} 
                value={this.state.description} /> 
               
              <br/>

              <label for="files">Select Files:</label>
              <input type="file" name="files" multiple onChange = {event => this.handleFiles(event)} 
                />

              <br/>

              <button>Add File</button>
          </form>

          <div>
            <h4>Files</h4>

            <div>

            {this.showFiles()}




            </div>




          </div>

                



        </div>


      )


    }




  }
