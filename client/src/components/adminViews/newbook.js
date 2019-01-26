import React, {Component} from 'react';
import AddBooks from './addBooks';

class NewBOOK extends Component{
    state = {
        title: '',
        author: '',
        publishedYear: '',
        pages: '',
        quantity: '',
        language: '',
        ISBN : '',
        category : '',
        about : ''
      }
addBook = () => {

}
render(){
    return(
        <div > 
            <AddBooks newState = {this.state}  action = 'ADD_BOOK'/>
        </div>
    )
}
}
export default NewBOOK;