import React, {Component} from 'react';
import BookForm from './bookform';
import {Button} from 'reactstrap';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {deleteBook} from '../../../redux/actions/bookActions';

class EditableBook extends Component{
    state = {
        showBookForm: false
    }
    closeBookForm = () => {
        this.setState({showBookForm: false});
    }
    
    render(){ 
        const{_id, title, author, isbn, publishedYear, language, pages, about, quantity, category, cover} = this.props.book;
        if(this.state.showBookForm){
            return(
                <tr key = {_id}>
                     <td><BookForm 
                     _id = {_id}
                     title = {title}
                     author = {author}
                     publishedYear = {publishedYear}
                     isbn = {isbn}
                     quantity= {quantity}
                     language= {language}
                     pages = {pages}
                     category= {category}
                     cover = {cover}
                     about= {about}
                     closeBookForm = {this.closeBookForm} /> </td>
                </tr>
            )
        }else
        return(
            <tr key = {_id}> 
                <td> {title} </td>
                <td> {author} </td>
                <td> <Button size='sm' color='success' onClick = {() => this.props.history.push(`/books/${_id}`)} >View </Button> </td>
                <td> <Button size='sm' color='warning' onClick = {() => this.setState({showBookForm: true})}>Edit </Button> </td>
                <td> <Button size='sm' color='danger' onClick = {() => this.props.deleteBook(_id)}>Delete </Button> </td>
            </tr>
                
        )
    }
}
const mapDispatchToprops = dispatch => {
    return{
        deleteBook: _id => dispatch(deleteBook(_id))
    }
}   

export default withRouter(connect(null, mapDispatchToprops)(EditableBook));