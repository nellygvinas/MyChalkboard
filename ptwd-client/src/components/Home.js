import React from "react";
import { Switch, Route, NavLink, Link, Redirect } from "react-router-dom";


export default class Home extends React.Component {

    render(){
        return (
            <section>
            <NavLink id="home" className="navbar-brand" to="/login" > <img className="img-responsive" src="logo.png" style={{width: '450px',height: '150px'}}/> 
            </NavLink>
            </section>
        )
    }
}