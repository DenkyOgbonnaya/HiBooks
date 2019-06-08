import React, {Component} from 'react';
import ToggleableBookForm from './toggleableform';
import EditableBookList from './editableBookList';
import {connect} from 'react-redux';
import {getAllBooks} from '../../../redux/actions/bookActions';
import actionType from '../../../redux/actions/actionType';
import Spinnar from '../../utils/spinner';

class BookDashboard extends Component{

    componentDidMount(){
        this.props.getAllBooks();
        if(this.props.allBooks.length > 0)
            this.props.toggleSpinner();
    }
    render(){
        const books = this.props.allBooks;
        return(
            <div> 
                <h3>Manage Books </h3>
                <ToggleableBookForm />
                <hr />
                <h5> Existing </h5>
                {
                    this.props.isLoading ? <Spinnar /> :
                <EditableBookList books = {books}  />
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        allBooks: state.books.allBooks,
        isLoading: state.books.isLoading
    }
}
const mapDispatchToprops = dispatch => {
    return{
        getAllBooks: () => dispatch(getAllBooks()),
        toggleSpinner: () => dispatch({type: actionType.TOGGLE_SPINNER})
    }
}   

export default connect(mapStateToProps, mapDispatchToprops)(BookDashboard);