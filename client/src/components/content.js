import React,  {Component} from "react";
import {Route, Switch, withRouter, Redirect } from "react-router-dom";   
import BorrowBook from "./borrowbook";
import BorrowedHistory from "./borrowedhistory";
import UserProfile from "./userProfile";
import AllBooks from "./allbooks";
import ChangePassword from './authviews/changepassword'
import {connect} from 'react-redux';
import NewBOOK from "./adminViews/newbook";
import Notifications from './notifications';
import About from './about';
import Contact from "./contact";
import ManageUsers from "./adminViews/manageusers";
import Footer from './footer'
class Content extends Component{

    render(){
        
        return(
            <div className= 'content'> 
                <Switch>
                    <Route exact path= "/borrowBooks" component= {BorrowBook} />
                    <Route exact path= "/historyLog" component= {BorrowedHistory} /> 
                    <Route exact path=  "/addBook" component = {NewBOOK} />
                    <Route exact path= {`/${this.props.user.name}`}  component= {UserProfile}/>
                    <Route exact path= {`/${this.props.user.name}/changePassword`}  component= {ChangePassword}/>
                    <Route exact path= "/notifications" component={Notifications} />
                    <Route exact path= "/manageUsers" component= {ManageUsers}/>
                    <Route exact path= "/about" component={About} />
                    <Route exact path= "/contact" component= {Contact}/>
                    <Route exact path= "/" component={AllBooks} /> 
                    <Redirect from= '/login' to='/' exact /> 
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