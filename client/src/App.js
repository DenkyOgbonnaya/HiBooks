import React, { Component } from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import Header from "./components/dashboards/navheader";
import Routes from "./components/routes";
import {connect} from 'react-redux';
import {authToken, toggleSideBar} from './redux/actions/authActions';
import SideNav from './components/includes/sidenav';
import './App.css';

class App extends Component {
  componentWillMount(){
    const token = localStorage.getItem('userToken');
    if(token){
        this.props.authToken(token);
    }
}
render(){
    return(
        <Router>
            <div className= "App"> 
                <Header /> 
                <br />
                <div className="wrapper" id={this.props.hideSidebar ? '' : 'diplaySidebar'}>
                    <div className= 'sidebar' onClick= {()=> this.props.closeSideBar()} >
                    {
                        true ? < SideNav /> : ''
                    }
                    </div>
                    <div className= 'main' >
                        <Routes />
                        
                    </div>
                    
                </div>
                
            </div>
        </Router>
        
    )   
}           

}

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