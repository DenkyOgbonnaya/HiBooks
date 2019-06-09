import React, {Component} from 'react';
import UserProfile from './userProfile';
import RentedBooks from '../books/rentedBooks';

class DashBoard extends Component {

    render(){
        return(
            <div> 
                <UserProfile />
                <RentedBooks />
            </div>
        )
    }
}

export default DashBoard;