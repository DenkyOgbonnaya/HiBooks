import React,  {Component} from "react";
import {Route, Switch} from "react-router-dom";   
import RentLogs from "./includes/rentLogs";
import ProfileDashboard from "./profile/dashboard";
import ChangePassword from './authviews/changepassword'
import Notifications from './adminViews/notifications';
import About from './includes/about';
import Contact from "./includes/contact";
import ManageUsers from "./adminViews/manageusers";
import BooksDashboard from './adminViews/books/bookdashboard';
import PrivateRoute from './authviews/privateRoute';
import Footer from './includes/footer'
import Login from "./authviews/login";
import SignUp from './authviews/signup';
import ForgotPassword from "./authviews/forgotpassword";
import Dashboard from "./books/Dashboard";
import CategoryDashboard from './adminViews/categories/dashboard';
import PasswordReset from "./authviews/passwordReset";

const Routes = () => {
    //const {authenticated} = this.props;
        return(
            <div className= 'content'> 
                <Switch>
                    <PrivateRoute exact path= "/rentlogs" component= {RentLogs} /> 
                    <PrivateRoute exact path= '/profile'  component= {ProfileDashboard}/>
                    <PrivateRoute exact path= '/changePassword'  component= {ChangePassword}/>
                    <PrivateRoute exact path= "/notifications" component={Notifications} />
                    <PrivateRoute exact path= "/books" component= {BooksDashboard}/>
                    <PrivateRoute exact path= "/users" component= {ManageUsers}/>
                    <PrivateRoute exact path= "/" component = {Dashboard}  /> 
                    <PrivateRoute exact path= "/categories" component = { CategoryDashboard} /> 
                    <PrivateRoute exact path= "/signUp" component= {SignUp}/>
                    <Route exact path= "/passwordReset" component= {PasswordReset}/>
                    <Route exact path= "/login" component= {Login}/>
                    <Route exact path= "/about" component= {About}/>
                    <Route exact path= "/contact" component= {Contact}/>
                    <Route exact path= "/forgotPassword" component= {ForgotPassword}/>
                </Switch> 
                <Footer />
            </div>  
        )  
}

export default Routes; 