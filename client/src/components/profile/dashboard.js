import React, {Component} from 'react';
import UserProfile from './userProfile';
import RentedBooks from '../books/rentedBooks';
import {connect} from 'react-redux';

class DashBoard extends Component {

    render(){
        return(
            <div> 
                <UserProfile /> 
                <RentedBooks userId = {this.props.user._id} /> 
            </div>
        )
    }
}
const mapStateToProps = (state)=> {
    return{
        user: state.auth.currentUser,
    }
} 
export default connect(mapStateToProps)(DashBoard);