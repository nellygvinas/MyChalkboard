import React from "react";
import axios from "axios";
// import { Switch, Route, NavLink, Link } from "react-router-dom";
import AddTeacher from "../setup/AddTeacher"
import SchoolList from "../school/SchoolList"
import ClassList from "../class/ClassList"

export default class Posting extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      postId: null,
      creation: "",
      description: "",
      files: "",
      class: "",
      creator: "",
      likes: [],
      comments: [],
      allPostings: [],
      visiblePostings: null,
      parents: [],
      allClasses: this.props.allClasses,
    }
  }

    componentDidMount(){

      console.log("Props on Posting mount: ", this.props )
      console.log("State of Posting component on mount: ", this.state)

      return this.state.allClasses.map((eachClass, index)=>{

          axios.get(`${process.env.REACT_APP_API_URL}/posting/`+eachClass._id, { withCredentials: true })
          .then( postingsFound => {
            
            console.log("Postings found for class Id: ", postingsFound.data.posts)
            
            this.setState({ allPostings: [...this.state.allPostings, ...postingsFound.data.posts ] }, () => {
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

    submitPostForm(event){

      event.preventDefault();
      const formData = new FormData();
      
      for(let i = 0, numFiles = this.state.files.length; i < numFiles; i++) {
      let file = this.state.files[i]   
       formData.append('file', this.state.files[i])
       }
    
      formData.append('creation', this.state.creation)
      formData.append('description', this.state.creation)
      
      axios.post(
        // route we are hitting in the backend
        `${process.env.REACT_APP_API_URL}/landing/post/`+this.state.class,
        // the data from the form (AKA req.body 🚀) that we are sending to this route to do the job
        formData,
        // secure sending
        { withCredentials: true }
      )
      .then( responseFromServer => {
        
         console.log("New post created: ", responseFromServer.data.newPost)

         this.setState({ postId:responseFromServer.data.newPost._id }, ()=>{console.log("state after new post created: ", this.state)})

          // axios.get(`${process.env.REACT_APP_API_URL}/posting/`+this.state.classId, { withCredentials: true })
          // .then( updatedClass => {
          //   console.log("Class found after edit: ", updatedClass.data.classFound)
            

          //   this.setState({ className: updatedClass.data.classFound.className }, () => {
          //     console.log("State after updates:", this.state)}
          //     );  

          //   })
          // .catch(err => console.log("Err while searching for class: ", err))
            
      })
      .catch( err => console.log("Err in class update: ", err));

    }

    renderPostImages(images){
              
      return images.map((image,index) => {
        return  <div key={index}><img src={image} alt="" className="img-responsive" /><br/></div> 
     });

    }


    showLikes(post){
              
        return  <div>{post.likes.length} liked <br/></div> 
     
    }

    addLike(post){
      
      console.log("the post we are liking is: ", post)
     
      
      axios.put(
        // route we are hitting in the backend
        `${process.env.REACT_APP_API_URL}/landing/post/like/`+post,
        this.props.currentUser,
        // secure sending
        {withCredentials: true}
      )
      .then( responseFromServer => {
        
         console.log("post liked: ", responseFromServer.data.postLiked)

        //  this.setState({ postId:responseFromServer.data.newPost._id }, ()=>{console.log("state after new post created: ", this.state)})
            
      })
      .catch( err => console.log("Err in class update: ", err));


    }





    showPostings(){
      
      return this.state.allPostings.map((eachPost, index)=>{
  
        return( 

        <div key={index}>
          {eachPost.creator.fullName}
          <br/>
          {eachPost.class.className}
          <br/>
          {this.renderPostImages(eachPost.files)}
          <br/>
          <button onClick={() => this.addLike(eachPost._id)}>Like this Post</button>
          <br/>
          {this.showLikes(eachPost)}
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
          <h2> STORY </h2> 

          Add a New Story
          <br/>

          <form onSubmit={event => this.submitPostForm(event)} id="postingform" encType="multipart/form-data">
              
              <label for="class">Select class:</label>
              <select onChange={event => this.selectChange(event)}>
                <option name="class" value=" ">Select a Class</option>
                {this.showClassesForPost()}
              </select>
              <br/>
              
              <label for="creation">Post Date:</label>
              
              <input 
                type="date" name="creation" 
                placeholder="Date" 
                onChange = {event => this.genericSync(event)} 
                value={this.state.creation} /> 
                
              <br/>

              <label for="description">Caption:</label>
              <input 
                type="text" 
                name="description" 
                placeholder="Subject" 
                onChange = {event => this.genericSync(event)} 
                value={this.state.description} /> 
               
              <br/>

              <label for="files">Select Images:</label>
              <input type="file" name="files" multiple onChange = {event => this.handleFiles(event)} 
                />

              <br/>

              <button>Add Post</button>
          </form>

          <div>
            <h4>Posts</h4>

            {this.showPostings()}


          </div>



         </div>
                



       </div>


      )


    }




  }
