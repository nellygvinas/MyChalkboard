import React from "react";
import axios from "axios";
import { Switch, Route, NavLink, Link } from "react-router-dom";


export default class Role extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      fullName: "",
      email: "",
      password:"",
      role: "Unassigned",
      classes: "",
      image: "",
      message: null
      }
    }

    genericSync(event){
      // console.log("what is: ", event.target.value)
      const { name, value } = event.target;
      this.setState({ [name]: value })
    }

    syncCurrentUSer(user){
      this.setState({ currentUser: user })
    }

    handleSubmit (event){
    // console.log("submitting form");
    event.preventDefault();

    } //end of handleSubmit


    render(){


      return (

        <div>

           <h2>ROLE COMPONENT </h2>
                







        </div>
      )




    }  









}