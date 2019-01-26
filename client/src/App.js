import React, { Component } from 'react';
import {Route, Switch, Redirect, BrowserRouter as Router} from "react-router-dom";
import Header from "./components/dashboards/navheader";
import Content from "./components/content";
import {connect} from 'react-redux';
import GuestHeader from "./components/dashboards/guestheader";
import SignUp from "./components/authviews/signup";
import Login from "./components/authviews/login";
import {authToken, toggleSideBar} from './redux/actions/authActions';
import ForgotPassword from "./components/authviews/forgotpassword";
import SideNav from './components/dashboards/sidenav';
import About from "./components/about";
import Contact from "./components/contact";
import Footer from "./components/footer";
import './App.css';

class App extends Component {
  componentWillMount(){
    const token = localStorage.getItem('userToken');
    if(token){
        this.props.authToken(token);
    }
}
render(){
    if(this.props.authenticated)
    return(
        <Router>
            <div className= "App"> 
                <Header /> 
                <div className="wrapper" id={this.props.hideSidebar ? '' : 'diplaySidebar'}>
                    <div className= 'sidebar' onClick= {()=> this.props.closeSideBar()} >
                        < SideNav />
                    </div>
                    <div className= 'main' >
                        <Content />
                        
                    </div>
                    
                </div>
                
            </div>
        </Router>
        
    )   
    return(
        <Router>
            <div className='App'> 
                <GuestHeader />
                <div className='main'  >
                <AuthPage  />
                <Footer />
                </div>
            </div>
        </Router>
    )
}           

}
const AuthPage = (pr) =>
        <div>
            <Switch>
                <Route exact path= "/signUp" component= {SignUp}/>
                <Route exact path= "/login" component= {Login}/>
                <Route exact path= "/about" component= {About}/>
                <Route exact path= "/contact" component= {Contact}/>
                <Route exact path= "/forgotPassword" component= {ForgotPassword}/>
                <Redirect to='/login' exact />
            </Switch>
        </div>

const mapStateToProps = (state)=> {
return{
    currentUser: state.auth.currentUser,
    authenticated: state.auth.authenticated,
    hideSidebar: state.auth.hideSidebar,
}
} 
const mapDispatchToProps = (dispatch)=> {
return{
  authToken: (token)=> dispatch(authToken(token)),
  toggleSideBar: () => dispatch(toggleSideBar()),
  closeSideBar: () => dispatch({type:'CLOSE_SIDEBAR'})
}
}   

export default connect(mapStateToProps, mapDispatchToProps)(App);