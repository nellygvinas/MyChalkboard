import React from "react";
import axios from "axios";
// import { Link } from "react-router-dom";
import update from 'immutability-helper';

export default class PostDetails extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      currentUser: {
        userId: this.props.location.state.currentUser.userId,
        fullName: this.props.location.state.currentUser.fullName
        },
      postId: this.props.location.state.postId,
      creation: this.props.location.state.creation,
      description: this.props.location.state.description,
      files: [this.props.location.state.files],
      class: this.props.location.state.class,
      creator: this.props.location.state.creator,
      likes: [this.props.location.state.likes],
      comments: this.props.location.state.comments,
      comment: "",
      // allClasses: this.props.allClasses,
    }
  }

    componentDidMount(){

      console.log("Props on Post Detail mount: ", this.props )
      console.log("State of Post Detail component on mount: ", this.state)

     
          axios.get(`${process.env.REACT_APP_API_URL}/landing/post/`+this.state.postId, { withCredentials: true })
          .then( postingFound => {
            
            console.log("Posting found by Id: ", postingFound.data.thePost)
            
            // this.setState({ creation:  }, () => {
            //   console.log("State after updates:", this.state)}
            //   );  

            // this.setState({ myArray: [...this.state.myArray, ...[1,2,3] ] })

            })
          .catch(err => console.log("Err while searching for class: ", err))

       

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
              
        return  <div>{this.state.likes.length} likes <br/></div> 
     
    }

    addLike(postId){
      
      console.log("the post we are liking is: ", postId)
     
      
      axios.put(
        // route we are hitting in the backend
        `${process.env.REACT_APP_API_URL}/landing/post/like/`+postId,
        this.props.currentUser,
        // secure sending
        {withCredentials: true}
      )
      .then( responseFromServer => {
        
         console.log("post liked: ", responseFromServer.data.postLiked)

         this.setState({
          likes: update(this.state.likes, {$push: [this.state.currentUser.userId]}
         )}, ()=> {console.log("update to postings: ", this.state)})
        // this.setState({ allPostings:  }, ()=>{console.log("state after new post created: ", this.state)})

            
      })
      .catch( err => console.log("Err in class update: ", err));



    }

    showComments(commentsArray){

      return commentsArray.map((eachComment,index) => {
        return  <div key={index}>
          {/* {eachComment} */}
          {eachComment.user.fullName}: {eachComment.comment}
          <br/></div> 
     });
      
    }




    showPost(){

        return( 

        <div >
          {this.state.creator}
          <br/>
          {this.state.class}
          <br/>
          {this.renderPostImages(this.state.files)}
          <br/>
          {this.state.description}
          <br/>
          <button onClick={() => this.addLike(this.state.postId)}>Like this Post</button>
          <br/>

          {this.showLikes()}

          {this.showComments(this.state.comments)}

          <br/>
        </div>
        )
    }


    addComment(event){

      event.preventDefault();

      axios.put(
        // route we are hitting in the backend
        `${process.env.REACT_APP_API_URL}/landing/post/`+this.state.postId,
        this.state,
        // secure sending
        {withCredentials: true}
      )
      .then( responseFromServer => {
        
         console.log("Comment added: ", responseFromServer.data)

         let fullName = this.state.currentUser.fullName;

         this.setState({
          comments: update(this.state.comments, {$push: [{user: {fullName: this.state.currentUser.fullName}, comment: this.state.comment}]}
         )}, ()=> {console.log("update to comments: ", this.state)})
            
      })
      .catch( err => console.log("Err in class update: ", err))

    }


    render(){

      return (
        
        <div id="post-details">


          <div>
            {this.showPost()}
          </div>

          <form onSubmit={event => this.addComment(event)} id="commentform">

              <input 
                type="text" 
                name="comment" 
                placeholder="Add comment..." 
                onChange = {event => this.genericSync(event)} 
                value={this.state.comment} /> 
              <br/>

              <button>Comment </button>

          </form>




       </div>


      )


    }




  }
