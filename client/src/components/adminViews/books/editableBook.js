import React, {Component} from 'react';
import BookForm from './bookform';
import {Button} from 'reactstrap';
import {connect} from 'react-redux';
import {deleteBook} from '../../../redux/actions/bookActions';
import actionType from '../../../redux/actions/actionType';

class EditableBook extends Component{
    state = {
        showBookForm: false
    }
    closeBookForm = () => {
        this.setState({showBookForm: false});
    }
    
    render(){ 
        const{_id, title, author, ISBN, publishedYear, language, pages, about, category } = this.props.book;
        if(this.state.showBookForm){
            return(
                <tr key = {_id}>
                     <td><BookForm 
                     _id = {_id}
                     title = {title}
                     author = {author}
                     publishedYear = {publishedYear}
                     ISBN = {ISBN}
                     language= {language}
                     pages = {pages}
                     category= {category}
                     about= {about}
                     closeBookForm = {this.closeBookForm} /> </td>
                </tr>
            )
        }else
        return(
            <tr key = {_id}> 
                <td> {title} </td>
                <td> {author} </td>
                <td> <Button color='success'>View </Button> </td>
                <td> <Button color='warning' onClick = {() => this.setState({showBookForm: true})}>Edit </Button> </td>
                <td> <Button color='danger' onClick = {() => this.props.deleteBook(_id)}>Delete </Button> </td>
            </tr>
                
        )
    }
}
const mapDispatchToprops = dispatch => {
    return{
        deleteBook: _id => dispatch(deleteBook(_id))
    }
}   

export default connect(null, mapDispatchToprops)(EditableBook);