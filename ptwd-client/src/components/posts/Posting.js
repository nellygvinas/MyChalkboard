import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import update from 'immutability-helper';

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
      comment: "",
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
            
            this.setState({ allPostings: [...postingsFound.data.posts] }, () => {

              // ...this.state.allPostings, 
              console.log("State after get request for postings:", this.state)}
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
      
       formData.append('file', this.state.files[i])
       }
    
      formData.append('creation', this.state.creation)
      formData.append('description', this.state.description)
      
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
         
 
          axios.get(`${process.env.REACT_APP_API_URL}/landing/post/`+responseFromServer.data.newPost._id, { withCredentials: true })
          .then( addedPost => {
           
            console.log("Post created is: ", addedPost.data.thePost)
            

            this.setState({ postId: addedPost.data.thePost._id }, ()=>{console.log("state after new post created: ", this.state)})


            this.setState({
             allPostings: update(this.state.allPostings, {$unshift: [addedPost.data.thePost]}
            )}, ()=> {console.log("update to postings: ", this.state)})

              

            })
          .catch(err => console.log("Err while searching for class: ", err))
            
      })
      .catch( err => console.log("Err in class update: ", err));

    }

    renderPostImages(images){
              
      return images.map((image,index) => {
        return  <div key={index}><img src={image} alt="" className="img-responsive" /><br/></div> 
     });

    }


    showLikes(post){
              
        return  <div>{post.likes.length} likes <br/></div> 
     
    }

    addLike(post, index){
      
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

         this.setState({
          allPostings: update(this.state.allPostings, {[index]: {likes: {$push: [this.props.currentUser._id]}}}
         )}, ()=> {console.log("update to postings: ", this.state)})
        // this.setState({ allPostings:  }, ()=>{console.log("state after new post created: ", this.state)})

            
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
          {eachPost.creation}
          <br/>
          {this.renderPostImages(eachPost.files)}
          <br/>
          {eachPost.description}
          <br/>
          <button onClick={() => this.addLike(eachPost._id, index)}>Like this Post</button>
          <br/>

          {this.showLikes(eachPost, index)}

          <Link to={{
            pathname: `/post/details/`+eachPost._id,
            state: {
              currentUser: {
                userId: this.props.currentUser._id,
                fullName: this.props.currentUser.fullName,
                email: this.props.currentUser.email,
                role: this.props.currentUser.role
              },
                postId: eachPost._id,
                creator: eachPost.creator.fullName,
                class: eachPost.class.className,
                files: eachPost.files,
                description: eachPost.description,
                likes: eachPost.likes,
                comments: eachPost.comments
             }
           }}> Add Comment </Link>
         
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


    showComments(){

      return this.state.comments.map((eachComment, index)=>{
  
        return( 
        
         <div key={index}>
           {eachComment.creator.fullName}

         </div>  

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
              
              <label htmlFor="class">Select class:</label>
              <select onChange={event => this.selectChange(event)}>
                <option name="class" value=" ">Select a Class</option>
                {this.showClassesForPost()}
              </select>
              <br/>
              
              <label htmlFor="creation">Post Date:</label>
              
              <input 
                type="date" name="creation" 
                placeholder="Date" 
                onChange = {event => this.genericSync(event)} 
                value={this.state.creation} /> 
                
              <br/>

              <label htmlFor="description">Caption:</label>
              <input 
                type="text" 
                name="description" 
                placeholder="Subject" 
                onChange = {event => this.genericSync(event)} 
                value={this.state.description} /> 
               
              <br/>

              <label htmlFor="files">Select Images:</label>
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
