import React,  {Component} from "react";
import {Route, Switch, withRouter, Redirect } from "react-router-dom";   
import BorrowedHistory from "./borrowedhistory";
import ProfileDashboard from "./profile/dashboard";
import ChangePassword from './authviews/changepassword'
import {connect} from 'react-redux';
import Notifications from './notifications';
import About from './about';
import Contact from "./contact";
import ManageUsers from "./adminViews/manageusers";
import BooksDashboard from './adminViews/books/bookdashboard';
import PrivateRoute from './authviews/privateRoute';
import Footer from './footer'
import Login from "./authviews/login";
import SignUp from './authviews/signup';
import ForgotPassword from "./authviews/forgotpassword";
import Dashboard from "./books/Dashboard";
import CategoryDashboard from './adminViews/categories/dashboard';

class Content extends Component{

    render(){
        
        return(
            <div className= 'content'> 
                <Switch>
                    <Route exact path= "/historyLog" component= {BorrowedHistory} /> 
                    <Route exact path= {`/${this.props.user.name}`}  component= {ProfileDashboard}/>
                    <Route exact path= {`/${this.props.user.name}/changePassword`}  component= {ChangePassword}/>
                    <Route exact path= "/notifications" component={Notifications} />
                    <Route exact path= "/manageUsers" component= {BooksDashboard}/>
                    <Route exact path= "/" component = {Dashboard} /> 
                    <Route exact path= "/categories" component = { CategoryDashboard} /> 
                    <Route exact path= "/signUp" component= {SignUp}/>
                    <Route exact path= "/login" component= {Login}/>
                    <Route exact path= "/about" component= {About}/>
                    <Route exact path= "/contact" component= {Contact}/>
                    <Route exact path= "/forgotPassword" component= {ForgotPassword}/>
                </Switch> 
                <Footer />
            </div>  
        )  
    } 
}
const mapStateToProps = (state)=> {
    return {
        user: state.auth.currentUser
    }
}


export default withRouter(connect(mapStateToProps)(Content));